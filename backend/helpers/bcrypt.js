const bcrypt = require('bcrypt');

const createHashPassword = async (myPlaintextPassword) => {
  const hash = await bcrypt.hash(myPlaintextPassword, 10) 
  return hash;
}

const compareHashPassword = async (myPlaintextPassword, hash) => {
  const validPassword = bcrypt.compare(myPlaintextPassword, hash) 
  if (validPassword) {
  return response
  .status(200)
  .json({status:200, message : "Request succesfful:"})
  }else {
    return response
    .status(401)
    .json({status:401, message : "Your login is incorrect, please verify your password and try again" }) 
  }
    }

module.exports = {createHashPassword, compareHashPassword}