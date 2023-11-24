const bcrypt = require('bcrypt');

const createHashPassword = async (myPlaintextPassword) => {
  const hash = await bcrypt.hash(myPlaintextPassword, 10) 
  return hash;
}

const compareHashPassword = async (myPlaintextPassword, hash) => {
  return bcrypt.compare(myPlaintextPassword, hash);
}

module.exports = {createHashPassword, compareHashPassword}