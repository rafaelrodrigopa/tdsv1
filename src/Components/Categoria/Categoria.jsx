import React from 'react';

const categorias = [
  { id: 'todos', label: 'Todos' },
  { id: 'classicos', label: 'Clássicos' },
  { id: 'especiais', label: 'Especiais' },
  { id: 'veganos', label: 'Veganos' },
];

const Categoria = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-4 text-center">
      <div className="btn-group" role="group">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`btn btn-outline-primary ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categoria;
