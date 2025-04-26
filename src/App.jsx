import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logoCharada from './assets/img/charada-motos.svg';
import './App.css';
import Footer from './Components/Footer/Footer';
import Newsletter from './Components/Newsletter/Newsletter';
import Navbar from './Components/Navbar/Navbar';
import HeroSection from './Components/Hero/HeroSection';
import Categoria from './Components/Categoria/Categoria';
import Produto from './Components/Produto/Produto';

const App = () => {


const [cartItems, setCartItems] = useState([]);
const [showCart, setShowCart] = useState(false);

  return (
    <div className="App">
      {/* Navbar Moderna */}
      <Navbar cartItems={cartItems} setShowCart={setShowCart} />

      {/* Hero Section */}
      <HeroSection />

      <Produto />

      {/* Newsletter 
      <Newsletter />*/}
      {/*Trazer footer aqui*/}
      <Footer />

    </div>
  );
};

export default App;