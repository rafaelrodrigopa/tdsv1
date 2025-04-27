import React, { useState, useEffect } from 'react';
import { Modal, Button, Accordion, Form } from 'react-bootstrap';
import { FaCheckCircle, FaMotorcycle, FaStore } from 'react-icons/fa';
import axios from 'axios';
import { getStoreAddress } from '../../../../services/firebase_end'; // Ajuste o caminho conforme sua estrutura
import ServiceModal from '../ServiceModal/ServiceModal';
import AddressForm from '../CEP/AddressForm'

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
            <Button
              variant={deliveryOption === 'pickup' ? 'success' : 'outline-secondary'}
              onClick={() => handleDeliverySelection('pickup')}
              className="text-start p-3"
            >
              <div className="d-flex align-items-center">
                {deliveryOption === 'pickup' && <FaCheckCircle className="me-2" />}
                <FaStore className="me-3" size={24} />
                <div>
                  <h5 className="mb-1">Retirar na loja</h5>
                  <small className="text-muted">{storeAddress.street}, {storeAddress.number}</small>
                </div>
              </div>
            </Button>

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
                  <small className="text-muted">Frete calculado conforme localização</small>
                </div>
              </div>
            </Button>
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