import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const enderecoService = {
  /**
   * Busca o endereço (considerando ID automático)
   * @returns {Promise<Object|null>} Dados do endereço ou null se não existir
   */
  async getDadosEndereco() {
    try {
      // 1. Acessa a coleção 'endereco'
      const querySnapshot = await getDocs(collection(db, 'endereco'));
      
      // 2. Verifica se há documentos
      if (querySnapshot.empty) {
        console.warn('Nenhum endereço encontrado na coleção "endereco"');
        return null;
      }

      // 3. Pega o PRIMEIRO documento (supondo que só existe um)
      const primeiroDoc = querySnapshot.docs[0];
    
      
      return {
        id: primeiroDoc.id, // Inclui o ID gerado automaticamente
        ...primeiroDoc.data()
      };

    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      return null; // Retorna null para tratamento no componente
    }
  }
};