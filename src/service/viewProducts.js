const axios = require('axios');
const url = 'http://localhost:3001/products';

const viewProductsClient = async() => {
  const soapRequest = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
      xmlns:prod="http://www.example.org/products/">
      <soapenv:Header/>
      <soapenv:Body>
          <prod:getProducts />
      </soapenv:Body>
  </soapenv:Envelope>`;
  
  try {
    const response = await axios.post(url, soapRequest, {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'urn:getProducts'
        }
    });

    //console.log('Respuesta en formato XML:', response.data);
    return response.data;  // Devuelve la respuesta XML
  } catch (error) {
        console.error('Error en la solicitud SOAP:', error);
  }
};

const searchProduct = async (req, res) => {
  const productName = req.params.name.trim();
  //const encodedProductName = encodeURIComponent(productName);
  const soapRequest = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:prod="http://www.example.org/products/">
    <soapenv:Header/>
    <soapenv:Body>
        <prod:getProductsByName>
            <product_name>${productName}</product_name>
        </prod:getProductsByName>
    </soapenv:Body>
  </soapenv:Envelope>`;

  try {
    const response = await axios.post(url, soapRequest, {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'urn:getProductByName'
        }
    });

    return response.data; 
  } catch (error) {
        console.error('Error en la solicitud SOAP:', error);
  }
};


const filterProducts = async (req, res) => {
  const productsFilter = req.params.category.trim();
  //const encodedProductName = encodeURIComponent(productsFilter);
  const soapRequest = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:prod="http://www.example.org/products/">
    <soapenv:Header/>
    <soapenv:Body>
        <prod:getProductsByCategory>
            <category_name>${productsFilter}</category_name>
        </prod:getProductsByCategory>
    </soapenv:Body>
  </soapenv:Envelope>
  `;

  try {
    const response = await axios.post(url, soapRequest, {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'urn:getProductsByCategory'
        }
    });

    return response.data; 
  } catch (error) {
        console.error('Error en la solicitud SOAP:', error);
  }
};

module.exports = {
  viewProductsClient,
  searchProduct,
  filterProducts

};