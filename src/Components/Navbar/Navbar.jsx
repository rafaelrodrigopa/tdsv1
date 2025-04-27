import React, { useState } from 'react';
import logoCharada from '../../assets/img/charada_logo.png';

const Navbar = () => {
  const [searchActive, setSearchActive] = useState(false);

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  return (
    <>
      <nav className="navbar navbar-light bg-white sticky-top border-bottom">
        <div className="container-fluid px-3 px-lg-4">
          {/* Menu Hamburguer (SEMPRE visível) */}
          <div className="d-flex align-items-center">
            <button 
              className="navbar-toggler me-2 border-0 p-0" 
              type="button" 
              data-bs-toggle="offcanvas" 
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
              style={{ fontSize: '2rem' }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Textos empilhados (visível apenas no desktop) */}
            <div className="d-none d-lg-flex flex-column">
              <div className="fw-bold small">AÇAÍ CENTRAL</div>
              <div className="small">CAMPINAS - SP</div>
            </div>
          </div>

          {/* Ícone de pesquisa (sempre alinhado à direita) */}
          <button 
            className="btn btn-link text-dark p-0 ms-auto"
            onClick={toggleSearch}
          >
            <i className="bi bi-search fs-5"></i>
          </button>
        </div>

        {/* Barra de pesquisa expandida */}
        <div className={`search-bar ${searchActive ? 'active' : ''}`}>
          <div className="container-fluid px-3 px-lg-4 py-2">
            <div className="input-group">
              <input 
                type="text" 
                className="form-control border-0 shadow-none" 
                placeholder="Pesquisar no cardápio..." 
                autoFocus
              />
              <button 
                className="btn btn-link text-dark" 
                onClick={toggleSearch}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Off-canvas Menu */}
      <div 
        className="offcanvas offcanvas-start" 
        tabIndex="-1" 
        id="offcanvasMenu" 
        aria-labelledby="offcanvasMenuLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold" id="offcanvasMenuLabel">MENU</h5>
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="offcanvas" 
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <ul className="nav flex-column">
            <li className="nav-item border-bottom">
              <a className="nav-link py-3 px-4" href="#">
                <i className="bi bi-menu-button-wide me-2"></i>
                CARDÁPIO
              </a>
            </li>
            <li className="nav-item border-bottom">
              <a className="nav-link py-3 px-4" href="#">
                <i className="bi bi-receipt me-2"></i>
                MEUS PEDIDOS
              </a>
            </li>
            <li className="nav-item border-bottom">
              <a className="nav-link py-3 px-4" href="#">
                <i className="bi bi-tag me-2"></i>
                CUPONS
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Estilos personalizados */}
      <style jsx>{`
        .search-bar {
          position: absolute;
          top: -100%;
          left: 0;
          right: 0;
          background: white;
          z-index: 1020;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: top 0.3s ease;
        }
        .search-bar.active {
          top: 0;
        }
        .navbar-toggler {
          font-size: 1.5rem;
          padding: 0.25rem;
        }
        .offcanvas-start {
          width: 280px;
        }
        .nav-link {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Navbar;