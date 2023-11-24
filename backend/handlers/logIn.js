//Sign In endpoint where we ceate the user an validate that his 
//username is not taken 

"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();

const {compareHashPassword} = require("../helpers/bcrypt")

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const collectionName = "users"
const database = "CrossCountryData"


const logIn = async (request, response) => {

  const {user} = request.body;
  const {username, password} = user;

  if (!user || !username || !password) {
    return response
    .status(401)
    .json({ status: 401,  message : "Please provide a username and a password to log in"});
  }

  try {

    await client.connect();
    const db = client.db(database);
    console.log("connected!");

    const validUser = await db.collection(collectionName).findOne({username : user.username});

    console.log(validUser);

    if (!validUser) {
      return response
      .status(401)
      .json({ status: 401, message : `Please provide a valid email address and password` });
    }

    const validPassword = await compareHashPassword(user.password,validUser.password)

    if(!validPassword) {
      return response
      .status(401)
      .json({ status: 401, message : `Please provide a valid email address and password` });
    }

      //after all test is passed 
      return response
      .status(200)
      .json({status:200,  data : user.username, message : "Request sucessfull: "});
}
  
  catch(error) {
    console.log(error.stack);
    return response
    .status(500)
    .json({status:500, message : " Unexpected Error with the server" });
  
  } finally {
  client.close();
  console.log("disconected!");
    }
}

module.exports = logIn;