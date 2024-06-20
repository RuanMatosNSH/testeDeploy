const express = require('express')
const router = express.Router()
const SearchPostalCodeController = require('../controllers/SearchPostalCodeController')
const env = require('../utils/EnvironmentVariables')

router.get('/get-postal-code', async(req,res)=>{
  try {
    /* 1234567891011 */
      if( !(req.query && req.query.postalCode) ) {
        return res.status(env.HTTP_CODE_BAD_REQUEST).json({ 
          success: false, 
          message: env.ERROR_MESSAGE_VALIDATION,
          errorCode: env.ERROR_CODE_VALIDATION
        });
      }
      const zipCodePayload = await SearchPostalCodeController.getPostalCode(req.query.postalCode);      
      return res.status(env.HTTP_CODE_SUCCESS).json(zipCodePayload);      
  } catch(err){
      res.status(env.HTTP_CODE_ERROR).json({
      success: false,
      message: env.ERROR_MESSAGE_SERVICE
    });
  }
})

router.get('/', (req, res) => {
  res.status(200).send(env.ROUTE_TEST_MESSAGE);
})

module.exports = router