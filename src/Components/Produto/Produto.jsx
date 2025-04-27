import React, { useState, useEffect, useRef, useCallback } from 'react';
import Categoria from '../Categoria/Categoria';
import { productService } from '../../services/firebase_products';
import { categoryService } from '../../services/firebase_categories';
import './Produto.css'; // Importação do CSS

const Produto = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const categoryRefs = useRef({});
  const observer = useRef(null);
  const lastScrollTime = useRef(0);

  // Função para carregar os dados
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
        
        // Define a primeira categoria como ativa
        if (categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].id);
        }
        
        setCategories(categoriesData.map(cat => ({
          ...cat,
          label: cat.name
        })));
        
        // Mapeia os produtos com suas categorias
        const productsWithCategories = productsData.map(product => {
          const productCategory = categoriesData.find(cat => cat.id === product.id_categoria);
          
          return {
            ...product,
            categoryName: productCategory?.name || 'Sem categoria',
            categoryColor: productCategory?.color || '#6c757d'
          };
        });

        setProducts(productsWithCategories);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar produtos. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função de fallback para o scroll
  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current > 100) {
      lastScrollTime.current = now;
      
      Object.values(categoryRefs.current).forEach(ref => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top <= 120 && rect.bottom >= 100;
          if (isVisible) {
            const categoryId = ref.id.replace('cat-', '');
            setActiveCategory(prev => prev === categoryId ? prev : categoryId);
          }
        }
      });
    }
  }, []);

  // Configura o IntersectionObserver
  useEffect(() => {
    if (categories.length === 0 || products.length === 0) return;

    const options = {
      root: null,
      rootMargin: window.innerWidth < 768 ? '-40% 0px -55% 0px' : '-25% 0px -65% 0px',
      threshold: window.innerWidth < 768 ? 0.15 : 0.1
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= options.threshold) {
          const categoryId = entry.target.id.replace('cat-', '');
          setActiveCategory(prev => prev === categoryId ? prev : categoryId);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, options);

    Object.values(categoryRefs.current).forEach(ref => {
      if (ref) observer.current.observe(ref);
    });

    // Adiciona fallback para scroll
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [categories, products, handleScroll]);

  // Agrupa produtos por categoria
  const productsByCategory = products.reduce((acc, product) => {
    const categoryId = product.id_categoria || 'outros';
    
    if (!acc[categoryId]) {
      acc[categoryId] = {
        products: [],
        category: categories.find(c => c.id === categoryId) || { 
          id: categoryId, 
          name: product.categoryName || 'Outros', 
          color: product.categoryColor || '#6c757d' 
        }
      };
    }
    acc[categoryId].products.push(product);
    return acc;
  }, {});

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
            className="category-section mb-5 pt-2"
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