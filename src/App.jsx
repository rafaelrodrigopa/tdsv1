import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('todos');
  
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary-gradient sticky-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src="https://i.imgur.com/5X5X5X5.png" width="40" height="40" className="me-2" alt="Logo" />
            <span className="fw-bold">Açaí Central</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Início</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Cardápio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Promoções</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contato</a>
              </li>
            </ul>
            <div className="d-flex">
              <button className="btn btn-outline-light me-2">
                <i className="bi bi-person-fill me-1"></i> Login
              </button>
              <button className="btn btn-light text-primary fw-bold">
                <i className="bi bi-cart-fill me-1"></i> Pedir Online
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="container h-100 d-flex align-items-center">
          <div className="hero-text text-white">
            <h1 className="display-4 fw-bold mb-3">O Melhor Açaí da Região</h1>
            <p className="lead mb-4">Experimente nosso açaí premium preparado com ingredientes selecionados</p>
            <button className="btn btn-light btn-lg text-primary fw-bold px-4">
              Ver Cardápio
            </button>
          </div>
        </div>
      </header>

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

      {/* Destaque */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="display-5 fw-bold mb-3">Açaí Gourmet Especial</h2>
              <p className="lead mb-4">Experimente nosso novo açaí gourmet com frutas exóticas e toppings premium.</p>
              <div className="d-flex align-items-center">
                <button className="btn btn-light btn-lg text-primary me-3">
                  Experimente Agora
                </button>
                <a href="#" className="text-white text-decoration-underline">Ver ingredientes</a>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="https://images.unsplash.com/photo-1560264284-0a8b1d3f6d2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="img-fluid rounded-3 shadow" alt="Destaque" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="bg-light p-5 rounded-3 shadow-sm">
                <h2 className="mb-4">Receba nossas promoções</h2>
                <p className="text-muted mb-4">Cadastre-se e receba ofertas exclusivas no seu e-mail</p>
                <form className="row g-2 justify-content-center">
                  <div className="col-md-8">
                    <div className="input-group">
                      <input 
                        type="email" 
                        className="form-control form-control-lg" 
                        placeholder="Seu melhor e-mail" 
                        aria-label="Seu melhor e-mail"
                      />
                      <button className="btn btn-primary btn-lg" type="submit">
                        Cadastrar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white pt-5 pb-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <h5 className="text-uppercase mb-4">
                <img src="https://i.imgur.com/5X5X5X5.png" width="30" height="30" className="me-2" alt="Logo" />
                Açaí Central
              </h5>
              <p className="small text-muted">O melhor açaí da cidade, feito com amor e qualidade.</p>
              <div className="social-icons mt-3">
                <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white me-3"><i className="bi bi-whatsapp"></i></a>
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <h5 className="text-uppercase mb-4">Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Início</a></li>
                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Cardápio</a></li>
                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Promoções</a></li>
                <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Contato</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4">
              <h5 className="text-uppercase mb-4">Horário</h5>
              <ul className="list-unstyled text-muted">
                <li className="mb-2">Segunda a Sábado: 10h às 22h</li>
                <li className="mb-2">Domingo: 12h às 20h</li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4">
              <h5 className="text-uppercase mb-4">Contato</h5>
              <address className="text-muted">
                <p className="mb-2"><i className="bi bi-geo-alt-fill me-2"></i> Rua do Açaí, 123</p>
                <p className="mb-2"><i className="bi bi-telephone-fill me-2"></i> (11) 98765-4321</p>
                <p className="mb-0"><i className="bi bi-envelope-fill me-2"></i> contato@acaicentral.com</p>
              </address>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center pt-3">
            <p className="small text-muted mb-0">&copy; {new Date().getFullYear()} Açaí Central. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Bootstrap Icons */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" />
      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default App;