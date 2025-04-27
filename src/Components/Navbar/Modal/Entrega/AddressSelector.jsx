import React, { useState, useEffect } from 'react';
import { Modal, Button, Accordion, Form } from 'react-bootstrap';
import { FaCheckCircle, FaMotorcycle, FaStore } from 'react-icons/fa';
import axios from 'axios';
import { getStoreAddress } from '../../../../services/firebase_end'; // Ajuste o caminho conforme sua estrutura

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

  const handleServiceSubmit = () => {
    // Lógica para enviar dados do agendamento
    setShowServiceModal(false);
    setShowModal(false);
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
            <Accordion defaultActiveKey="0" className="mt-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Informe seu CEP</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>CEP</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Digite seu CEP"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                      />
                      <Button 
                        variant="primary" 
                        className="ms-2"
                        onClick={handleCepSearch}
                      >
                        Buscar
                      </Button>
                    </div>
                  </Form.Group>

                  {address && (
  <>
    <Form.Group className="mb-3">
      <Form.Label>Logradouro</Form.Label>
      <Form.Control 
        type="text" 
        value={address.street || ''} // Garante string vazia se undefined
        readOnly 
      />
    </Form.Group>
    <div className="row">
      <div className="col-4">
        <Form.Group className="mb-3">
          <Form.Label>Número</Form.Label>
          <Form.Control
            type="text"
            value={address.number || ''}
            onChange={(e) => setAddress({...address, number: e.target.value})}
          />
        </Form.Group>
      </div>
      <div className="col-8">
        <Form.Group className="mb-3">
          <Form.Label>Complemento</Form.Label>
          <Form.Control
            type="text"
            value={address.complement || ''}
            onChange={(e) => setAddress({...address, complement: e.target.value})}
          />
        </Form.Group>
      </div>
    </div>
    <Form.Group className="mb-3">
      <Form.Label>Bairro</Form.Label>
      <Form.Control 
        type="text" 
        value={address.neighborhood || ''} 
        readOnly 
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Cidade</Form.Label>
      <Form.Control 
        type="text" 
        value={address.city || ''} 
        readOnly 
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Estado</Form.Label>
      <Form.Control 
        type="text" 
        value={address.state || ''} 
        readOnly 
      />
    </Form.Group>
  </>
)}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
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
      <Modal show={showServiceModal} onHide={() => setShowServiceModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agendar Serviço</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                type="text"
                value={clientData.name}
                onChange={(e) => setClientData({...clientData, name: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="tel"
                value={clientData.phone}
                onChange={(e) => setClientData({...clientData, phone: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Modelo da Moto</Form.Label>
              <Form.Control
                type="text"
                value={clientData.bikeModel}
                onChange={(e) => setClientData({...clientData, bikeModel: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Placa</Form.Label>
              <Form.Control
                type="text"
                value={clientData.plate}
                onChange={(e) => setClientData({...clientData, plate: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowServiceModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleServiceSubmit}>
            Finalizar Agendamento
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddressSelector;