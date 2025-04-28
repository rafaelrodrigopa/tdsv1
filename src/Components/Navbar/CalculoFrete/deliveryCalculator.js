// src/utils/deliveryCalculator.js

/**
 * Calcula distância aproximada entre dois pontos (fórmula de Haversine)
 * @param {number} lat1 - Latitude do ponto 1 (loja)
 * @param {number} lon1 - Longitude do ponto 1 (loja)
 * @param {number} lat2 - Latitude do ponto 2 (cliente)
 * @param {number} lon2 - Longitude do ponto 2 (cliente)
 * @returns {number} Distância em quilômetros
 */
// Adicione esta função no arquivo deliveryCalculator.js:
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distância em km
  };
  
  /**
   * Calcula valor do frete conforme regras:
   * - R$0,90 por km para distâncias >= 1km
   * - Taxa fixa de R$3,50 para distâncias < 1km
   * @param {number} km - Distância em quilômetros
   * @returns {number} Valor do frete em reais
   */
  export const calculateDeliveryFee = (km) => {
    return km >= 1 ? km * 0.9 : 3.5;
  };
  
  /**
   * Obtém coordenadas geográficas a partir de um endereço (usando API Nominatim)
   * @param {string} address - Endereço completo
   * @returns {Promise<{lat: number, lon: number}>} Coordenadas
   */
// src/utils/deliveryCalculator.js
// deliveryCalculator.js
export const getCoordinates = async (address) => {
    try {
      // 1. Tentativa com Nominatim
      const nominatimResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=br`,
        {
          headers: {
            'User-Agent': 'SeuApp/1.0 (seu@email.com)' // 👈 Substitua com seus dados
          }
        }
      );
      
      const nominatimData = await nominatimResponse.json();
      
      if (nominatimData.length > 0) {
        return {
          lat: parseFloat(nominatimData[0].lat),
          lon: parseFloat(nominatimData[0].lon),
          source: 'nominatim'
        };
      }
  
      // 2. Fallback para teste (substitua pelas coordenadas da sua loja)
      const FALLBACK_COORDINATES = {
        'Rua do Acre, 231, Parque Cento e Vinte, Francisco Morato, SP, Brasil': {
          lat: -23.1937,
          lon: -46.5331,
          source: 'fallback'
        }
      };
  
      if (FALLBACK_COORDINATES[address]) {
        return FALLBACK_COORDINATES[address];
      }
  
      throw new Error('Endereço não encontrado em nenhum serviço');
  
    } catch (err) { // 👈 Corrigido para usar 'err' ao invés de 'error'
      console.error('Erro detalhado na geocodificação:', {
        address,
        error: err // 👈 Objeto de erro corretamente definido
      });
      throw new Error(`Falha ao geocodificar: ${err.message}`);
    }
  };