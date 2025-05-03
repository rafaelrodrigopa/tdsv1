import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import HeroSection from './Components/Hero/HeroSection';
import Produto from './Components/Produto/Produto';
import { CartProvider } from './context/CartProvider';
import ProductCard from './Components/Produto/ProductCard/ProductCard';

const App = () => {

  const productData = {
    id: 1,
    nome: 'Produto Exemplo',
    descricao: 'Descrição breve do produto',
    preco: 99.99,
    imagem: 'caminho/para/imagem.jpg'
  };

  return (
    <div className="App">
      <CartProvider>
        <Navbar />
        <HeroSection />
        <Produto />
        <Footer />
        <ProductCard product={productData} />
      </CartProvider>

    </div>
  );
};

export default App;