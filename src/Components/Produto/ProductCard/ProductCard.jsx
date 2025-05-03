import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiShoppingCart, FiStar, FiClock } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const [cartItems, setCartItems] = useState(0);

  const handleAddToCart = () => {
    setCartItems(prev => prev + 1);
  };

  return (
    <>
      <div className="col-md-6 col-lg-4 mb-4 pb-6"> {/* Adicionado pb-4 para espaço do botão flutuante */}
        <div className="card h-100 border-0 shadow-sm">
          {/* Container com tamanho fixo e centralização */}
<div className="position-relative overflow-hidden" style={{
  width: '250px', 
  height: '250px',
  margin: '0 auto'
}}>
  {/* Imagem centralizada */}
  <div className="d-flex justify-content-center align-items-center h-100">
    <img
      src={product.imagem || 'https://source.unsplash.com/random/600x400?food'}
      className="img-fluid object-fit-cover"
      alt={product.nome}
      style={{
        width: '100%',
        height: '100%',
        objectPosition: 'center'
      }}
    />
  </div>
  
  {/* Badge "NOVO" */}
  {product.isNovo && (
    <span className="position-absolute top-0 start-0 m-2 bg-success text-white px-2 py-1 rounded-pill small">
      NOVO
    </span>
  )}
</div>

          {/* Corpo do card */}
          <div className="card-body d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title mb-0 fw-bold">{product.nome}</h5>
              <span className="text-primary fw-bold fs-5">
                {product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            <p className="card-text text-secondary small mb-3 flex-grow-1">
              {product.descricao || 'Descrição não disponível'}
            </p>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`me-1 ${i < 4 ? 'text-warning fill-current' : 'text-secondary'}`} 
                    size={16}
                  />
                ))}
                <small className="text-muted ms-1">(24)</small>
              </div>

              {product.estoque > 0 && (
                <div className="d-flex align-items-center text-muted small">
                  <FiClock className="me-1" size={14} />
                  <span>30-45 min</span>
                </div>
              )}
            </div>

            <button
              className={`btn w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center ${
                product.estoque <= 0 ? 'btn-outline-secondary' : 'btn-primary'
              }`}
              onClick={handleAddToCart}
              disabled={product.estoque <= 0}
            >
              <FiShoppingCart className="me-2" />
              {product.estoque > 0 ? 'Adicionar ao Carrinho' : 'Esgotado'}
            </button>
          </div>
        </div>
      </div>

      {/* Botão flutuante do carrinho - Largura total */}
{/* Botão flutuante - Largura total com bordas arredondadas */}
{cartItems > 0 && (
  <div className="position-fixed bottom-0 start-0 end-0 p-3" style={{ zIndex: 1050 }}>
    <button 
      className="btn w-100 rounded-pill py-3 d-flex align-items-center justify-content-center position-relative"
      style={{ height: '60px', maxWidth: 'calc(100% - 1.5rem)', margin: '0 auto', backgroundColor: '#77CC8A' }}
    >
      <span style={{fontSize: '1.4rem'}}>Ver Carrinho</span>
      <div className="position-relative ms-2">
        <FiShoppingCart size={25} />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
          {cartItems}
        </span>
      </div>
    </button>
  </div>
)}
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    descricao: PropTypes.string,
    preco: PropTypes.number.isRequired,
    imagem: PropTypes.string,
    estoque: PropTypes.number,
    isNovo: PropTypes.bool,
  }).isRequired,
};

export default ProductCard;