// src/components/Produto/ProductCard/ProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../Produto.css'; // Opcional - se você quiser estilos específicos

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm border-0">
        {product.isNovo && (
          <div className="badge bg-danger position-absolute top-0 end-0 m-2">Novo</div>
        )}
        <div 
          className="card-img-top bg-light d-flex align-items-center justify-content-center" 
          style={{ height: '200px' }}
        >
          <img 
            src={product.imagem} 
            alt={product.nome} 
            className="img-fluid"
            style={{
              maxHeight: '100%',
              objectFit: 'contain'
            }} 
          />
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title mb-0">{product.nome}</h5>
            <span 
              className="badge" 
              style={{ 
                backgroundColor: product.categoryColor || '#6c757d',
                color: '#fff'
              }}
            >
              {product.categoryName || 'Geral'}
            </span>
          </div>
          <p className="card-text text-muted small">{product.descricao}</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="h5 text-primary mb-0">
              R$ {Number(product.preco).toFixed(2).replace('.', ',')}
            </span>
            <button 
              className="btn btn-sm btn-primary rounded-pill px-3"
              disabled={product.estoque <= 0}
            >
              {product.estoque > 0 ? 'Adicionar' : 'Esgotado'}
            </button>
          </div>
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
    categoryName: PropTypes.string,
    categoryColor: PropTypes.string,
    id_categoria: PropTypes.string
  }).isRequired
};

export default ProductCard;