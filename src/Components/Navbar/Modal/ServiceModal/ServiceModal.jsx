import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

/**
 * Componente Modal para Agendamento de Serviço
 * 
 * Responsabilidades:
 * - Exibir formulário de agendamento (nome, telefone, modelo da moto, placa)
 * - Gerenciar estado dos dados do cliente
 * - Fechar o modal e repassar dados ao componente pai ao submeter
 * 
 * Props:
 * - show (boolean): Controla visibilidade do modal
 * - onHide (function): Função para fechar o modal
 * - onSubmit (function): Callback que recebe { name, phone, bikeModel, plate }
 */
const ServiceModal = ({ show, onHide, onSubmit }) => {
  // Estado dos dados do formulário (idêntico ao original)
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    bikeModel: '',
    plate: ''
  });

  // Atualiza estado ao digitar nos campos (mesma lógica)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData(prev => ({ ...prev, [name]: value }));
  };

  // Envia dados e fecha o modal (mesma lógica)
  const handleSubmit = () => {
    onSubmit(clientData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Agendar Serviço</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Formulário idêntico ao original */}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={clientData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={clientData.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Modelo da Moto</Form.Label>
            <Form.Control
              type="text"
              name="bikeModel"
              value={clientData.bikeModel}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Placa</Form.Label>
            <Form.Control
              type="text"
              name="plate"
              value={clientData.plate}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Finalizar Agendamento
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceModal;