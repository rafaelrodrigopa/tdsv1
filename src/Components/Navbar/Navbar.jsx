import React from 'react';
import logoCharada from '../../assets/img/charada_logo.png';

const Navbar = ({ cartItems, setShowCart }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary-gradient sticky-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logoCharada} width="40" height="40" className="me-2" alt="Logo" />
          <span className="fw-bold">Charada</span>
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* Links podem ser adicionados aqui quando necessário */}
          </ul>
          <div className="d-flex" style={{color: '#000'}}>
            <button className="btn btn-outline-dark me-2 bg-white" style={{color: '#000', bakckgroundColor: '#fff'}}> 
              <i className="bi bi-person-fill me-1" ></i> Login
            </button>
            <button 
              className="btn btn-light text-primary fw-bold position-relative"
              onClick={() => setShowCart(!showCart)}
            >
              <i className="bi bi-cart-fill me-1"></i> Pedir Online
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;