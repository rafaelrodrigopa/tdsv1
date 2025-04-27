import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import HeroSection from './Components/Hero/HeroSection';
import Produto from './Components/Produto/Produto';

const App = () => {

  return (
    <div className="App">
      {/* Navbar Moderna */}
      <Navbar />
      <HeroSection />
      <Produto />
      <Footer />

    </div>
  );
};

export default App;