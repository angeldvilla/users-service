const axios = require('axios');
const url = 'http://localhost:3001/products';

const viewProductsClient = async () => {
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
    console.log('Error en la solicitud SOAP:', error);
    return { message: 'Error en la solicitud SOAP'};
  }
};

const searchProduct = async (req, res) => {
  const productName = req.params.name;
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
    console.log('Error en la solicitud SOAP:', error);
    return { message: 'Error en la solicitud SOAP'};
  }
};


const filterProductsByCategory = async (req, res) => {
  const categoryFilter = req.params.category;
  const soapRequest = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:prod="http://www.example.org/products/">
    <soapenv:Header/>
    <soapenv:Body>
        <prod:getProductsByCategory>
            <category_name>${categoryFilter}</category_name>
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
    console.log('Error en la solicitud SOAP:', error);
    return { message: 'Error en la solicitud SOAP'};
  }
};

const filterProductsByBrand = async (req, res) => {
  const brandFilter = req.params.brand;
  const soapRequest = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:prod="http://www.example.org/products/">
    <soapenv:Header/>
    <soapenv:Body>
        <prod:getProductsByBrand>
            <brand_name>${brandFilter}</brand_name>
        </prod:getProductsByBrand>
    </soapenv:Body>
  </soapenv:Envelope>
  `;

  try {
    const response = await axios.post(url, soapRequest, {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'urn:getProductsByBrand'
      }
    });

    return response.data;
  } catch (error) {
    console.log('Error en la solicitud SOAP:', error);
    return { message: 'Error en la solicitud SOAP'};
  }
};

module.exports = {
  viewProductsClient,
  searchProduct,
  filterProductsByCategory,
  filterProductsByBrand
};
