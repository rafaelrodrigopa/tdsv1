import React, { useState, useEffect } from 'react';
import Categoria from '../Categoria/Categoria';
import { productService } from '../../services/firebase_products';
import { categoryService } from '../../services/firebase_categories';

const Produto = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Busca produtos e categorias em paralelo
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories()
        ]);
        

        // Verifica se temos dados
        if (!productsData || !categoriesData) {
          throw new Error("Dados não encontrados");
        }
        
        // Mapeia os produtos com suas categorias
        const productsWithCategories = productsData.map(product => {
          const productCategory = categoriesData.find(cat => cat.id === product.id_categoria);
          

          return {
            ...product,
            categoryName: productCategory?.name || 'Sem categoria'
          };
        });

        setProducts(productsWithCategories);
        
        // Cria array de categorias incluindo "Todos" como primeira opção
        const allCategories = [
          { id: 'todos', name: 'Todos' },
          ...categoriesData
        ];
        setCategories(allCategories);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar produtos. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = activeTab === 'todos' 
    ? products 
    : products.filter(product => product.id_categoria === activeTab);

  if (isLoading) {
    return (
      <div className="container py-5">
        <h2 className="text-center mb-4">Nossos Produtos</h2>
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
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Nossos Produtos</h2>

      <Categoria 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        categories={categories}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <h4>Nenhum produto encontrado nesta categoria</h4>
          <p className="text-muted">Tente selecionar outra categoria</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                {product.isNovo && (
                  <div className="badge bg-danger position-absolute top-0 end-0 m-2">Novo</div>
                )}
                <div className="card-img-top bg-light d-flex align-items-center justify-content-center" 
                     style={{ height: '200px' }}>
                  <span className="text-muted"><img src={product.imagem} alt="" srcset="" style={{width: '100px'}} /></span>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{product.nome}</h5>
                    <span className="badge bg-primary">
                      {product.categoryName}
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
                      <i className="bi bi-plus-lg me-1"></i> 
                      {product.estoque > 0 ? 'Adicionar' : 'Esgotado'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Produto;