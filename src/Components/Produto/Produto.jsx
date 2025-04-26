import React, { useState } from 'react';
import Categoria from '../Categoria/Categoria'; // import do componente de categoria

const Produto = () => {
  const [activeTab, setActiveTab] = useState('todos');

  const menuItems = [
    { id: 1, name: 'Açaí Tradicional', description: 'Açaí puro batido com guaraná', price: 'R$ 12,90', img: 'https://images.unsplash.com/photo-1551790628-6a9d8a8a8b8d', category: 'classicos' },
    { id: 2, name: 'Açaí Especial', description: 'Açaí com banana, granola e mel', price: 'R$ 15,90', img: 'https://images.unsplash.com/photo-1560264284-0a8b1d3f6d2a', category: 'classicos' },
    { id: 3, name: 'Açaí Power', description: 'Açaí com whey protein e frutas', price: 'R$ 18,90', img: 'https://images.unsplash.com/photo-1560264284-0a8b1d3f6d2a', category: 'especiais' },
    { id: 4, name: 'Copo da Felicidade', description: 'Mistura de açaí com diversas frutas', price: 'R$ 20,90', img: 'https://images.unsplash.com/photo-1560264284-0a8b1d3f6d2a', category: 'especiais' },
    { id: 5, name: 'Açaí Zero Lactose', description: 'Açaí com leite vegetal e mel', price: 'R$ 16,90', img: 'https://images.unsplash.com/photo-1560264284-0a8b1d3f6d2a', category: 'veganos' },
    { id: 6, name: 'Açaí Vegano', description: 'Açaí com frutas e granola vegana', price: 'R$ 17,90', img: 'https://images.unsplash.com/photo-1560264284-0a8b1d3f6d2a', category: 'veganos' },
  ];

  const filteredItems = activeTab === 'todos' ? menuItems : menuItems.filter(item => item.category === activeTab);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Nossos Produtos</h2>

      <Categoria activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="row g-4">
        {filteredItems.map(item => (
          <div key={item.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="badge bg-danger position-absolute top-0 end-0 m-2">Novo</div>
              <img src={item.img} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title mb-0">{item.name}</h5>
                  <span className="badge bg-primary">
                    {item.category === 'classicos' ? 'Popular' : 'Premium'}
                  </span>
                </div>
                <p className="card-text text-muted small">{item.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="h5 text-primary mb-0">{item.price}</span>
                  <button className="btn btn-sm btn-primary rounded-pill px-3">
                    <i className="bi bi-plus-lg me-1"></i> Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produto;
