// const { API_TOKEN } = require('./config')
// const logger = require('./logger')

// function validateBearerToken(req, res, next) {
  
//   const apiToken = process.env.API_TOKEN
//   const authToken = req.get('Authorization')
//   if (!authToken || authToken.split(' ')[1] !== apiToken) {
//     return res.status(401).json({ error: 'Unauthorized request' })
//   }

//   next()
  
// }

// module.exports = validateBearerToken

  // const apiToken = process.env.API_TOKEN
  // const authToken = req.get('Authorization')
 
  // //console.log(!authToken || authToken.split(' ')[1] !== API_TOKEN)
  // console.log("authToken: " , authToken)
  // if (!authToken || authToken.split(' ')[1] !== API_TOKEN) {
  //   return res.status(401).json({ error: 'Unauthorized request' })
  // }

  // next()