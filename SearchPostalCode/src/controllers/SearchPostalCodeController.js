const SearchPostalCodeService = require('../services/SearchPostalCodeService');

class SearchPostalCodeController {
      async getPostalCode(postalCode){
         return new Promise(async (resolve, reject) => {
           try {             
             var validZip = await SearchPostalCodeService.searchPostalCode(postalCode);
             resolve(validZip)
           } catch (error) {
             return reject(error)
           }
         })
      }
}

module.exports = new SearchPostalCodeController()
