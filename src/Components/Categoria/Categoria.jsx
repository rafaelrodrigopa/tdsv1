import React, { useEffect, useState } from 'react';
import { categoryService } from '../../services/firebase_categories';

const Categoria = ({ activeTab, setActiveTab }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await categoryService.getCategories();
        
        // Create the categories array with the "Todos" option first
        const formattedCategories = [
          //{ id: 'todos', label: 'Todos', color: '#0d6efd' }, // Default blue color for "Todos"
          ...categoriesData.map(cat => ({
            id: cat.id,
            label: cat.name,
            color: cat.color || '#6c757d' // Fallback to gray if no color specified
          }))
        ];
        
        setCategories(formattedCategories);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
        setError("Erro ao carregar categorias");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="mb-4 text-center">
        <div className="btn-group" role="group">
          {[...Array(4)].map((_, index) => (
            <button
              key={index}
              type="button"
              className="btn btn-outline-primary placeholder"
              style={{ width: '100px' }}
              disabled
            >
              &nbsp;
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4 text-center text-danger">
        {error}
      </div>
    );
  }

  return (
    <div className="mb-4 text-center">
      <div className="btn-group" role="group">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`btn btn-outline-primary ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.id)}
            style={{
              borderColor: cat.color,
              color: activeTab === cat.id ? '#fff' : cat.color,
              backgroundColor: activeTab === cat.id ? cat.color : 'transparent'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categoria;