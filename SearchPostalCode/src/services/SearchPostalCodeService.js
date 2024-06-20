const env = require('../utils/EnvironmentVariables')
const axios = require('axios')

class SearchPostalCodeService {

  async searchPostalCode(postalCode){
    return new Promise((resolve, reject) => {      
      try {
          const options = {
            method: env.METHOD_GET,
            url: env.SEARCH_POSTAL_CODE_URL.replace(env.PARAMETER_TO_REPLACE,postalCode),
            headers: {
              'Content-Type': 'application/json'
            }
          }
          axios(options)
            .then(res => {
              var payload = {};
              if(!res.data.hasOwnProperty(env.PROPERTY_POSTAL_CODE)){
                payload = {
                  success: false, 
                  message: env.ERROR_MESSAGE_NOT_FOUND,
                  errorCode: env.ERROR_CODE_NOT_FOUND        
                }
              } else {
                payload = {
                  postalCode : res.data.cep.replace("-",""),
                  address1   : res.data.logradouro,
                  address3   : res.data.complemento,
                  county     : res.data.bairro,
                  city       : res.data.localidade,
                  state      : res.data.uf,
                  country    : env.COUNTRY_DEFAULT,
                  success    : true 
                }
              }
              resolve(payload)
            })
            .catch(err => {              
              reject(err)
            })
        } catch (err) {
          reject(err)
        }
    });
   }
}

module.exports = new SearchPostalCodeService()
