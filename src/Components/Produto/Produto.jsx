import React, { useState, useEffect, useRef } from 'react';
import Categoria from '../Categoria/Categoria';
import { productService } from '../../services/firebase_products';
import { categoryService } from '../../services/firebase_categories';

const Produto = () => {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const categoryRefs = useRef({});
  const observer = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories()
        ]);
        
        if (!productsData || !categoriesData) {
          throw new Error("Dados não encontrados");
        }
        
        // Adiciona a categoria "Todos" no início
        const allCategories = [
          { id: 'todos', name: 'Todos', color: '#0d6efd' },
          ...categoriesData.map(cat => ({
            ...cat,
            label: cat.name // Garante compatibilidade com o componente Categoria
          }))
        ];
        
        setCategories(allCategories);
        setProducts(productsData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar produtos. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Configura o IntersectionObserver
  useEffect(() => {
    if (categories.length === 0) return;

    const options = {
      root: null,
      rootMargin: '0px 0px -80% 0px',
      threshold: 0.1
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.id.replace('cat-', '');
          setActiveCategory(prev => {
            // Mantém "todos" ativo até que outra categoria seja detectada
            if (prev === 'todos' && categoryId === 'todos') return prev;
            return categoryId;
          });
        }
      });
    }, options);

    // Observa todas as seções de categoria
    Object.values(categoryRefs.current).forEach(ref => {
      if (ref) observer.current.observe(ref);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [categories]);

  // Agrupa produtos por categoria
  const productsByCategory = products.reduce((acc, product) => {
    const categoryId = product.id_categoria || 'outros';
    if (!acc[categoryId]) {
      acc[categoryId] = {
        products: [],
        category: categories.find(c => c.id === categoryId) || { 
          id: 'outros', 
          name: 'Outros', 
          color: '#6c757d' 
        }
      };
    }
    acc[categoryId].products.push(product);
    return acc;
  }, {});

  // Adiciona a categoria "Todos" que contém todos os produtos
  productsByCategory.todos = {
    products: [...products],
    category: { id: 'todos', name: 'Todos', color: '#0d6efd' }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <Categoria 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
      />

      <div className="mt-3">
        {Object.entries(productsByCategory).map(([categoryId, { products: categoryProducts, category }]) => (
          <div 
            key={categoryId}
            id={`cat-${categoryId}`}
            ref={el => categoryRefs.current[categoryId] = el}
            className="category-section mb-5"
          >
            <h4 
              className="mb-4 pb-2 border-bottom"
              style={{ color: category.color }}
            >
              {category.name}
            </h4>
            <div className="row g-4">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente auxiliar para o card do produto
const ProductCard = ({ product }) => (
  <div className="col-md-6 col-lg-4">
    <div className="card h-100 shadow-sm border-0">
      {product.isNovo && (
        <div className="badge bg-danger position-absolute top-0 end-0 m-2">Novo</div>
      )}
      <div className="card-img-top bg-light d-flex align-items-center justify-content-center" 
          style={{ height: '200px' }}>
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
          <span className="badge" style={{ 
            backgroundColor: product.categoryColor || '#6c757d',
            color: '#fff'
          }}>
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

// Componente auxiliar para o estado de loading
const LoadingSkeleton = () => (
  <div className="container py-5">
    <div className="row g-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-img-top bg-light" style={{ height: '200px' }}></div>
            <div className="card-body">
              <div className="placeholder-glow">
                <h5 className="card-title placeholder col-8"></h5>
                <p className="card-text placeholder col-12"></p>
                <p className="card-text placeholder col-6"></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Produto;