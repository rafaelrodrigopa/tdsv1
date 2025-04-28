import React from 'react';
import { FaStore, FaMotorcycle } from 'react-icons/fa';

const AddressDisplay = ({ deliveryOption, storeAddress, address, deliveryFee }) => {
  return (
    <div className="small text-primary" style={{ cursor: 'pointer' }}>
      {deliveryOption === 'pickup' && storeAddress ? (
        <div key="pickup">
          <FaStore className="me-1" />
          <span className="fw-bold">Retirar em: </span> {storeAddress.street}, {storeAddress.number}
        </div>
      ) : deliveryOption === 'delivery' && address ? (
        <div key="delivery">
          <FaMotorcycle className="me-1" />
          <span className="fw-bold">Entregar em: </span> {address.street}, {address.number}
          {deliveryFee && (
            <span className="text-muted">
              {' '}(Frete: R${deliveryFee})
            </span>
          )}
        </div>
      ) : (
        <div key="empty">Insira seu endereço</div>
      )}
    </div>
  );
};

export default AddressDisplay;
