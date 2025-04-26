import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logoCharada from './assets/img/charada-motos.svg';
import './App.css';
import Footer from './Components/Footer/Footer';
import Newsletter from './Components/Newsletter/Newsletter';
import Navbar from './Components/Navbar/Navbar';
import HeroSection from './Components/Hero/HeroSection';

const App = () => {

const [activeTab, setActiveTab] = useState('todos');
const [cartItems, setCartItems] = useState([]);
const [showCart, setShowCart] = useState(false);


  
  const menuItems = [
    { id: 1, name: 'Açaí Tradicional', description: 'Açaí puro batido com guaraná', price: 'R$ 12,90', img: 'https://images.unsplash.com/photo-1551790628-6a9d8a8a8b8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', category: 'classicos' },
    { id: 2, name: 'Açaí Especial', description: 'Açaí com banana, granola e mel', price: 'R$ 15,90', img: 'https://images.unsplash.com/photo-1560264284-0a8b1d3f6d2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', category: 'classicos' },
    { id: 3, name: 'Açaí Power', description: 'Açaí com whey protein e frutas', price: 'R$ 18,90', img: 'https://images.unsplash.com/photo-1560264284-0a8b1d3f6d2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', category: 'especiais' },
    { id: 4, name: 'Copo da Felicidade', description: 'Mistura de açaí com diversas frutas', price: 'R$ 20,90', img: 'https://images.unsplash.com/photo-1560264284-0a8b1d3f6d2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', category: 'especiais' },
    { id: 5, name: 'Açaí Zero Lactose', description: 'Açaí com leite vegetal e mel', price: 'R$ 16,90', img: 'https://images.unsplash.com/photo-1560264284-0a8b1d3f6d2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', category: 'veganos' },
    { id: 6, name: 'Açaí Vegano', description: 'Açaí com frutas e granola vegana', price: 'R$ 17,90', img: 'https://images.unsplash.com/photo-1560264284-0a8b1d3f6d2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', category: 'veganos' },
  ];

  const filteredItems = activeTab === 'todos' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  return (
    <div className="App">
      {/* Navbar Moderna */}
      <Navbar cartItems={cartItems} setShowCart={setShowCart} />

      {/* Hero Section */}
      <HeroSection />

      {/* Cart Modal */}

      {/* Categorias */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-center mb-5">
            <div className="btn-group" role="group">
              <button 
                type="button" 
                className={`btn ${activeTab === 'todos' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('todos')}
              >
                Todos
              </button>
              <button 
                type="button" 
                className={`btn ${activeTab === 'classicos' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('classicos')}
              >
                Clássicos
              </button>
              <button 
                type="button" 
                className={`btn ${activeTab === 'especiais' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('especiais')}
              >
                Especiais
              </button>
              <button 
                type="button" 
                className={`btn ${activeTab === 'veganos' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('veganos')}
              >
                Veganos
              </button>
            </div>
          </div>

          {/* Produtos */}
          <div className="row g-4">
            {filteredItems.map(item => (
              <div key={item.id} className="col-md-6 col-lg-4">
                <div className="card product-card h-100 border-0 shadow-sm">
                  <div className="badge bg-danger position-absolute top-0 end-0 m-2">Novo</div>
                  <img src={item.img} className="card-img-top product-img" alt={item.name} />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0">{item.name}</h5>
                      <span className="badge bg-primary">{item.category === 'classicos' ? 'Popular' : 'Premium'}</span>
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
      </section>


      {/* Newsletter */}
      <Newsletter />
      {/*Trazer footer aqui*/}
      <Footer />

    </div>
  );
};

export default App;