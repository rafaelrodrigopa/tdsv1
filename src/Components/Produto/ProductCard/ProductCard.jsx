import React from 'react';
import PropTypes from 'prop-types';
import { FiShoppingCart, FiStar, FiClock } from 'react-icons/fi';
import './ProductCard.css'; // Importação do CSS

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 border-0 product-card">
        {/* Badge de Novo + Imagem */}
        <div className="position-relative overflow-hidden rounded-top">
          {product.isNovo && (
            <div className="badge bg-success position-absolute top-0 start-0 m-2 px-2 py-1">
              <small>NOVO</small>
            </div>
          )}
          <div className="product-image-container">
            <img 
              src={product.imagem || 'https://via.placeholder.com/300x200?text=Produto'} 
              alt={product.nome} 
              className="product-image"
            />
            <div className="image-overlay"></div>
          </div>
        </div>

        {/* Corpo do Card */}
        <div className="card-body p-3">
          {/* Nome e Preço */}
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title mb-0 fw-bold text-dark">{product.nome}</h5>
            <span className="h5 text-primary mb-0 fw-bold">
              R$ {Number(product.preco).toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Descrição */}
          <p className="card-text text-secondary small mb-3">
            {product.descricao || 'Delicioso produto preparado com ingredientes selecionados para seu paladar refinado.'}
          </p>

          {/* Rating e Tempo (opcional) */}
          <div className="d-flex align-items-center mb-3">
            <div className="d-flex text-warning me-2">
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
            </div>
            <small className="text-muted">(24 avaliações)</small>
          </div>

          {/* Botão de Ação */}
          <button 
            className={`btn w-100 rounded-pill py-2 fw-bold ${product.estoque <= 0 ? 'btn-outline-secondary' : 'btn-primary'}`}
            disabled={product.estoque <= 0}
          >
            {product.estoque > 0 ? (
              <>
                <FiShoppingCart className="me-2" />
                Adicionar ao Carrinho
              </>
            ) : (
              'ESGOTADO'
            )}
          </button>

          {/* Entrega (opcional) */}
          {product.estoque > 0 && (
            <div className="d-flex align-items-center mt-2">
              <FiClock className="text-muted me-1" size={14} />
              <small className="text-muted">Entrega em 30-45 min</small>
            </div>
          )}
        </div>
      </div>
    </div>
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
  }).isRequired
};

export default ProductCard;