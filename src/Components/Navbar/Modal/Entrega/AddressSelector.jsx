import React, { useState, useEffect } from 'react';
import { Modal, Button, Accordion, Form } from 'react-bootstrap';
import { FaCheckCircle, FaMotorcycle, FaStore } from 'react-icons/fa';
import axios from 'axios';
import { getStoreAddress } from '../../../../services/firebase_end'; // Ajuste o caminho conforme sua estrutura
import ServiceModal from '../ServiceModal/ServiceModal';
import AddressForm from '../CEP/AddressForm'
import DeliveryOptionButton from '../OptionButton/DeliveryOptionButton';

const AddressSelector = () => {
  const [showModal, setShowModal] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState(null);
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

  const handleContinue = () => {
    if (deliveryOption === 'pickup') {
      setShowModal(false);
    } else if (deliveryOption === 'delivery' && address) {
      setShowModal(false);
    }
  };


  if (loadingStoreAddress) {
    return <div className="text-center my-3">Carregando endereço da loja...</div>;
  }


  if (!storeAddress) {
    return <div className="text-center my-3 text-danger">Não foi possível carregar o endereço da loja</div>;
  }

  return (
    <>
      <div 
        className="small text-primary" 
        style={{ cursor: 'pointer' }}
        onClick={() => setShowModal(true)}
      >
        {deliveryOption === 'pickup' ? (
          <>
            <div className="fw-bold">Retirar em</div>
            <div>{storeAddress.street}, {storeAddress.number}</div>
          </>
        ) : deliveryOption === 'delivery' && address ? (
          <>
            <div className="fw-bold">Entregar em</div>
            <div>{address.street}, {address.number}</div>
          </>
        ) : (
          'Insira seu endereço'
        )}
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
            <div className="mt-4 text-center">
              <h5>O que você deseja?</h5>
              <div className="d-flex gap-2 justify-content-center mt-3">
                <Button 
                  variant="primary"
                  onClick={() => setShowModal(false)}
                >
                  Ver Produtos
                </Button>
                <Button 
                  variant="outline-primary"
                  onClick={() => setShowServiceModal(true)}
                >
                  Agendar Serviço
                </Button>
              </div>
            </div>
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