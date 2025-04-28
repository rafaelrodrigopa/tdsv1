import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaMotorcycle, FaStore, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { getStoreAddress } from '../../../../services/firebase_end';
import ServiceModal from '../ServiceModal/ServiceModal';
import AddressForm from '../CEP/AddressForm';
import DeliveryOptionButton from '../OptionButton/DeliveryOptionButton';
import AddressDisplay from './AddressDisplay';
import ServiceOptions from '../ServiceOption/ServiceOptions';
import AddressLoader from '../Loader/AddressLoader';
import { 
  getCoordinates, 
  calculateDistance, 
  calculateDeliveryFee,
  getStoreCoordinates
} from '../../CalculoFrete/deliveryCalculator';

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
  const [calculationDetails, setCalculationDetails] = useState(null);

  useEffect(() => {
    const loadStoreAddress = async () => {
      try {
        const addressData = await getStoreAddress();
        setStoreAddress(addressData);
      } catch (error) {
        console.error('Erro ao carregar endereço:', error);
        setStoreAddress({
          street: 'Estrada Arcílio Federzoni',
          number: '971',
          neighborhood: 'Jardim Silvia',
          city: 'Francisco Morato',
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
    setError(null);
    setDeliveryFee(null);
    setCalculationDetails(null);
    
    try {
      // Validação básica
      if (!address.street || !address.number || !address.city || !address.state) {
        throw new Error('Preencha todos os campos obrigatórios');
      }

      // Monta o endereço completo
      const fullAddress = [
        `${address.street}, ${address.number}`,
        address.complement,
        address.neighborhood,
        `${address.city}, ${address.state}`,
        'Brasil'
      ].filter(Boolean).join(', ');

      // Obtém coordenadas da loja
      const storeCoords = getStoreCoordinates();
      
      // Obtém coordenadas do cliente
      const clientCoords = await getCoordinates(fullAddress);
      
      // Calcula distância com detalhes
      const distanceResult = calculateDistance(
        storeCoords.lat,
        storeCoords.lon,
        clientCoords.lat,
        clientCoords.lon
      );
      
      // Armazena detalhes do cálculo
      setCalculationDetails({
        origin: storeCoords,
        destination: clientCoords,
        distance: distanceResult.distance,
        clientAddress: clientCoords.display
      });
      
      // Calcula frete
      const fee = calculateDeliveryFee(distanceResult.distance);
      setDeliveryFee(fee.toFixed(2));
      setShowModal(false);

    } catch (err) {
      setError(err.message);
      console.error('Erro no cálculo:', {
        error: err,
        address: address
      });
    }
  };

  return (
    <>
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      
      {/*{calculationDetails && (
        <Alert variant="info" className="mt-2">
          <div className="d-flex align-items-center">
            <FaMapMarkerAlt className="me-2" />
            <div>
              <strong>Origem:</strong> {getStoreCoordinates().address}<br />
              <strong>Destino:</strong> {calculationDetails.clientAddress}<br />
              <strong>Distância calculada:</strong> {calculationDetails.distance.toFixed(2)} km
            </div>
          </div>
        </Alert>
      )}*/}
      
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
          deliveryFee={deliveryFee}
          onClick={() => setShowModal(true)}
        />

        {/*<Button
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
        </Button>*/}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>O que vai ser hoje? Produto ou Serviço?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          {deliveryOption === 'delivery' && address.street && (
            <Button variant="primary" onClick={handleContinue}>
              Continuar
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <ServiceModal
        show={showServiceModal}
        onHide={() => setShowServiceModal(false)}
        onSubmit={(data) => {
          console.log('Dados do agendamento:', data);
          setShowServiceModal(false);
          setShowModal(false);
        }}
      />
    </>
  );
};

export default AddressSelector;