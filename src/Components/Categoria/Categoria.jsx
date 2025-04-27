import React, { useEffect, useRef } from 'react';

const Categoria = ({ activeCategory, setActiveCategory, categories }) => {
  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);

  // Rola o menu para deixar a categoria ativa visível
  useEffect(() => {
    if (menuRef.current && activeCategory) {
      const menu = menuRef.current;
      const activeButton = menu.querySelector(`[data-category="${activeCategory}"]`);
      
      if (activeButton) {
        const menuRect = menu.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        
        const scrollTo = activeButton.offsetLeft - (menuRect.width / 2) + (buttonRect.width / 2);
        
        menu.scrollTo({
          left: scrollTo,
          behavior: 'smooth'
        });
      }
    }
  }, [activeCategory]);

  return (
    <div 
      ref={menuContainerRef}
      className="categories-container"
      style={{
        position: 'sticky',
        top: '58px', // Altura da navbar (ajuste conforme necessário)
        zIndex: 1020,
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '0.5rem 0',
        width: '100%',
      }}
    >
      <div 
        ref={menuRef}
        className="d-flex overflow-auto hide-scrollbar px-2"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            data-category={cat.id}
            type="button"
            className={`btn btn-outline-primary rounded-pill mx-1 flex-shrink-0 ${
              activeCategory === cat.id ? 'active' : ''
            }`}
            onClick={() => {
              setActiveCategory(cat.id);
              const element = document.getElementById(`cat-${cat.id}`);
              if (element) {
                const offset = 120; // Ajuste fino para posicionamento
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
            style={{
              borderColor: cat.color,
              color: activeCategory === cat.id ? '#fff' : cat.color,
              backgroundColor: activeCategory === cat.id ? cat.color : 'transparent',
              padding: '0.375rem 1rem'
            }}
          >
            {cat.name || cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categoria;