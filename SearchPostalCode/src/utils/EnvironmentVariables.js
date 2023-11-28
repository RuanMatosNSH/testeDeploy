module.exports = {
  PORT : process.env.PORT || 3000,  
  SEARCH_POSTAL_CODE_URL :  "https://viacep.com.br/ws/{cep}/json/",  
  ERROR_CODE_NOT_FOUND : 1001,
  ERROR_CODE_VALIDATION : 1000,
  ERROR_MESSAGE_NOT_FOUND : "Postal code not found",
  ERROR_MESSAGE_VALIDATION : "Parameter 'postalCode' is required",
  COUNTRY_DEFAULT : "BR",
  HTTP_CODE_SUCCESS : 200,
  HTTP_CODE_ERROR: 500,
  HTTP_CODE_BAD_REQUEST: 400,
  ERROR_MESSAGE_SERVICE: "General error in search postal code service",
  ROUTE_TEST_MESSAGE : "SearchPostalCode route test",
  PARAMETER_TO_REPLACE: "{cep}",
  METHOD_GET : "get",
  PROPERTY_POSTAL_CODE : "cep"
}
