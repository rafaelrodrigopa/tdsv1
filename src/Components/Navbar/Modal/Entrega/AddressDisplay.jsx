import React from 'react';
import { FaStore, FaMotorcycle } from 'react-icons/fa';

/**
 * Componente AddressDisplay - Exibe o endereço selecionado (retirada/entrega)
 * 
 * Responsabilidades:
 * - Mostrar "Retirar em" ou "Entregar em" com o endereço correspondente
 * - Exibir ícone correspondente à opção selecionada
 * - Manter o mesmo estilo e comportamento do original
 * 
 * Props:
 * - deliveryOption (string): 'pickup' ou 'delivery'
 * - storeAddress (object): { street, number } (para retirada)
 * - address (object): { street, number } (para entrega)
 */
const AddressDisplay = ({ deliveryOption, storeAddress, address }) => {
  return (
    <div className="small text-primary" style={{ cursor: 'pointer' }}>
      {deliveryOption === 'pickup' ? (
        <>
          <div className="fw-bold">Retirar em</div>
          <div>
            <FaStore className="me-1" />
            {storeAddress.street}, {storeAddress.number}
          </div>
        </>
      ) : deliveryOption === 'delivery' && address ? (
        <>
          <div className="fw-bold">Entregar em</div>
          <div>
            <FaMotorcycle className="me-1" />
            {address.street}, {address.number}
          </div>
        </>
      ) : (
        'Insira seu endereço'
      )}
    </div>
  );
};

export default AddressDisplay;