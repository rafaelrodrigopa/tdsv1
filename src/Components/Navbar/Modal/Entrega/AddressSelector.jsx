import React, { useState, useEffect } from 'react';
import { Modal, Button, Accordion, Form } from 'react-bootstrap';
import { FaCheckCircle, FaMotorcycle, FaStore } from 'react-icons/fa';
import axios from 'axios';
import { getStoreAddress } from '../../../../services/firebase_end'; // Ajuste o caminho conforme sua estrutura
import ServiceModal from '../ServiceModal/ServiceModal';
import AddressForm from '../CEP/AddressForm'
import DeliveryOptionButton from '../OptionButton/DeliveryOptionButton';
import AddressDisplay from './AddressDisplay';
import ServiceOptions from '../ServiceOption/ServiceOptions';
import AddressLoader from '../Loader/AddressLoader';
import { calculateDeliveryFee, getCoordinates,calculateDistance } from '../../CalculoFrete/deliveryCalculator'; // Ajuste o caminho conforme sua estrutura


const AddressSelector = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(null);
  const [error, setError] = useState(null);

  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [storeAddress, setStoreAddress] = useState(null);
  const [loadingStoreAddress, setLoadingStoreAddress] = useState(true);
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    bikeModel: '',
    plate: ''
  });

  // Busca o endereço da loja ao carregar o componente
  useEffect(() => {
    const loadStoreAddress = async () => {
      try {
        const addressData = await getStoreAddress();
        setStoreAddress(addressData);
      } catch (error) {
        console.error('Erro ao carregar endereço:', error);
        // Define um endereço padrão em caso de erro
        setStoreAddress({
          street: 'Rua da Loja',
          number: '123',
          neighborhood: 'Centro',
          city: 'Cidade Padrão',
          state: 'SP'
        });
      } finally {
        setLoadingStoreAddress(false);
      }
    };

    loadStoreAddress();
  }, []);

  const handleCepSearch = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddress({
        street: response.data.logradouro || '',
        number: '',
        complement: '',
        neighborhood: response.data.bairro || '',
        city: response.data.localidade || '',
        state: response.data.uf || ''
      });
    } catch (error) {
      alert('CEP não encontrado ou erro na busca');
      // Mantém os campos vazios em caso de erro
      setAddress({
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
      });
    }
  };

  const handleDeliverySelection = (option) => {
    setDeliveryOption(option);
    if (option === 'pickup' && storeAddress) {
      setAddress({
        ...storeAddress,
        isStore: true
      });
    }
  };

  const handleContinue = async () => {
    setError(null); // Reseta erros anteriores
    setDeliveryFee(null); // Reseta o frete
    
    try {
      // 1. Validação básica do endereço
      if (!address.street || !address.number || !address.city) {
        throw new Error('Preencha todos os campos obrigatórios do endereço');
      }
  
      // 2. Coordenadas FIXAS da loja (substitua pelas suas coordenadas reais)
      const storeCoords = { 
        lat: -23.5505,  // Exemplo: São Paulo
        lon: -46.6333,
        name: "Sua Loja" // Adicione um identificador
      };
  
      // 3. Formatação do endereço do cliente
      const fullAddress = [
        `${address.street}, ${address.number}`,
        address.complement,
        address.neighborhood,
        address.city,
        address.state,
        'Brasil'
      ].filter(Boolean).join(', ');
  
      console.log('Buscando coordenadas para:', fullAddress); // Debug
      
      // 4. Geocodificação
      const clientCoords = await getCoordinates(fullAddress);
      
      // 5. Validação das coordenadas
      if (!clientCoords?.lat || !clientCoords?.lon) {
        throw new Error('Não foi possível determinar a localização exata do endereço');
      }
  
      console.log('Coordenadas encontradas:', clientCoords); // Debug
      
      // 6. Cálculo da distância
      const distance = calculateDistance(
        storeCoords.lat,
        storeCoords.lon,
        clientCoords.lat,
        clientCoords.lon
      );
      
      console.log('Distância calculada (km):', distance); // Debug
      
      // 7. Cálculo do frete (R$0,90/km ou R$3,50 para <1km)
      const fee = distance >= 1 ? distance * 0.9 : 3.5;
      setDeliveryFee(fee.toFixed(2));
      
      // 8. Fecha o modal
      setShowModal(false);
  
    } catch (err) {
      // Tratamento de erros
      setError(err.message);
      console.error('Erro no cálculo de frete:', {
        error: err,
        endereço: address,
        cep,
        timestamp: new Date().toISOString()
      });
      
      // Opcional: Fornecer frete padrão em caso de erro
      setDeliveryFee('10.00'); // Valor fallback
    }
  };


  return (

    
    <>
    {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      <div 
        className="small text-primary" 
        style={{ cursor: 'pointer' }}
        onClick={() => setShowModal(true)}
      >
        <AddressLoader 
          loading={loadingStoreAddress} 
          error={!storeAddress} 
        />
        <AddressDisplay 
          deliveryOption={deliveryOption}
          storeAddress={storeAddress}
          address={address}
          onClick={() => setShowModal(true)}
        />

      <Button
        variant={deliveryOption === 'delivery' ? 'success' : 'outline-secondary'}
        onClick={() => handleDeliverySelection('delivery')}
        className="text-start p-3"
      >
        <div className="d-flex align-items-center">
          {deliveryOption === 'delivery' && <FaCheckCircle className="me-2" />}
          <FaMotorcycle className="me-3" size={24} />
          <div>
            <h5 className="mb-1">Entregar no meu endereço</h5>
            <small className="text-muted">
              {deliveryFee ? `Frete: R$${deliveryFee}` : 'Frete calculado conforme localização'}
            </small>
          </div>
        </div>
      </Button>

      </div>

      {/* Modal principal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>O que vai ser hoje? Produto ou Serviço?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-grid gap-3">
            
          <div className="d-grid gap-3">
            <DeliveryOptionButton
              option="pickup"
              selectedOption={deliveryOption}
              onSelect={handleDeliverySelection}
              storeAddress={storeAddress}
            />
            <DeliveryOptionButton
              option="delivery"
              selectedOption={deliveryOption}
              onSelect={handleDeliverySelection}
              storeAddress={storeAddress}
            />
          </div>

          </div>


          {deliveryOption === 'pickup' && (
            <ServiceOptions
              onViewProducts={() => setShowModal(false)}
              onScheduleService={() => setShowServiceModal(true)}
            />
          )}

          {deliveryOption === 'delivery' && (
                  <AddressForm
                    cep={cep}
                    address={address}
                    onCepChange={(value) => setCep(value)}
                    onCepSearch={handleCepSearch}
                    onAddressChange={(field, value) => 
                      setAddress(prev => ({ ...prev, [field]: value }))
                    }
                  />
                )}
          
          
        </Modal.Body>
        <Modal.Footer>
          {deliveryOption === 'delivery' && address && (
            <Button variant="primary" onClick={handleContinue}>
              Continuar
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Modal de agendamento de serviço */}
      <ServiceModal
        show={showServiceModal}
        onHide={() => setShowServiceModal(false)}
        onSubmit={(data) => {
          // Lógica original de submissão
          console.log('Dados do agendamento:', data);
          setShowServiceModal(false);
          setShowModal(false);
        }}
      />
    </>
  );
};

export default AddressSelector;