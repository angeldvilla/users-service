const soap = require('soap');

// URL del WSDL del servicio de productos
const url = 'http://localhost:3001/products/wsdl';

// Función para crear el cliente e invocar operaciones
const viewProductsClient = async () => {
  try {
    const client = await soap.createClientAsync(url);
    return client;
  } catch (error) {
    console.error('Error al crear el cliente SOAP:', error);
    throw error;
  }
};

module.exports = viewProductsClient;
