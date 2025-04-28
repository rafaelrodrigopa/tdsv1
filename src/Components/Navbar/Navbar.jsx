import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css'; // Importação do CSS
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import AddressSelector from './Modal/Entrega/AddressSelector'; // Importação do componente de seleção de endereço

const Navbar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const searchInputRef = useRef(null);

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  // Efeito para focar no input quando a busca é ativada
  useEffect(() => {
    if (searchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchActive]);

  return (
    <>
      <nav className="navbar navbar-light bg-white sticky-top border-bottom custom-navbar">
        <div className="container-fluid px-3 px-lg-4">
          <div className="d-flex align-items-center">
            <button 
              className="navbar-toggler me-2 border-0 p-0 custom-toggler" 
              type="button" 
              data-bs-toggle="offcanvas" 
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Exibir no mobile também */}
            <div className="d-flex flex-column">
              <div className="fw-bold small">Opções de Entrega<MdOutlineKeyboardDoubleArrowDown /></div>
              {/*<div className="small">Insira seu endereço</div>*/}
              <AddressSelector /> 
            </div>
          </div>

          <button 
            className="btn btn-link text-dark p-0 ms-auto search-toggle"
            onClick={toggleSearch}
          >
            <i className="bi bi-search fs-5"></i>
          </button>
        </div>

        <div className={`search-bar ${searchActive ? 'active' : ''}`}
          style={{ height: '75px'}}
        >
          <div className="container-fluid px-3 px-lg-4 py-2">
            <div className="input-group">
            <input
                ref={searchInputRef}
                type="text" 
                className="form-control border-0 shadow-none" 
                placeholder="Pesquisar no cardápio..."
                style={{ marginTop: '0.6rem' }}
              />
              <button 
                className="btn btn-link text-dark search-close"
                onClick={toggleSearch}
                style={{ marginTop: '0.6rem'}}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div 
        className="offcanvas offcanvas-start custom-offcanvas" 
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
              <a className="nav-link py-3 px-4 menu-item" href="#">
                <i className="bi bi-menu-button-wide me-2"></i>
                CARDÁPIO
              </a>
            </li>
            <li className="nav-item border-bottom">
              <a className="nav-link py-3 px-4 menu-item" href="#">
                <i className="bi bi-receipt me-2"></i>
                MEUS PEDIDOS
              </a>
            </li>
            <li className="nav-item border-bottom">
              <a className="nav-link py-3 px-4 menu-item" href="#">
                <i className="bi bi-tag me-2"></i>
                CUPONS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
