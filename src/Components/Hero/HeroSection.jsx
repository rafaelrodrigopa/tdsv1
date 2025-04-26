import React from 'react';

const HeroSection = () => {
  return (
    <header className="hero-section">
      <div className="container h-100 d-flex align-items-center">
        <div className="hero-text text-white">
          <h1 className="display-4 fw-bold mb-3">A Melhor Oficina da Região</h1>
          <p className="lead mb-4">Experimente nossos serviços. Temos também diversas peças para sua moto</p>
          <button className="btn btn-light btn-lg text-primary fw-bold px-4">
            Ver Cardápio
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;