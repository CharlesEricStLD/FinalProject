//Sign In endpoint where we ceate the user an validate that his 
//username is not taken 

"use strict";
const { v4: uuidv4 } = require('uuid');

const { MongoClient } = require("mongodb");

require("dotenv").config();

const {createHashPassword} = require("../helpers/bcrypt")

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const collectionName = "users"
const database = "CrossCountryData"


const signin = async (request, response) => {

  const {user} = request.body;
  const {username, password} = user;

  if (!user || !username || !password) {
    return response
    .status(401)
    .json({ status: 401,  message : "Please provide a username and a password to sign in"});
  } 

  //RegEx espression to validate that username only contain alaphanumeric character 
  //and between 6 and 16 characters long
  const usernameTester = RegExp (/^[0-9A-Za-z]{6,16}$/);

  //Regex expression to validate that password contain at least one letter, one number and one special character 
  //and is a minimum of 8 characters
  const passwordTester = RegExp (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)

  if (!(usernameTester.test(username))) {
    return response
    .status(401)
    .json({status:401, message : "Invalid username, your username should only contain alaphanumeric character and be between 6 and 16 characters long" })
  }

  if(!(passwordTester.test(password))) {
    return response
    .status(401)
    .json({status:401, message : "Invalid password, your password should contain at least one letter, one number and one special character and be a minimum of 6 characters and a maximum of 16 characters long" })
  }

  const hashpassword = await createHashPassword(password)

  const newUser = {...user, _id : uuidv4(), password : hashpassword};
  
  try {

    await client.connect();
    const db = client.db(database);
    console.log("connected!");

    const alreadyUseUser = await db.collection(collectionName).findOne({username : newUser.username});

    if (alreadyUseUser) {
      return response
      .status(401)
      .json({ status: 401, message : `The  username ${newUser.username}  already esixt, please choose another one` });
    }

    //if user don't exist, create add it to the database
    const createdUser = await db.collection(collectionName).insertOne({_id : newUser._id, username : newUser.username, password : newUser.password});

    console.log(newUser);

    if (!createdUser || createdUser.insertedId !== newUser._id) {
        return response
        .status(500)
        .json({ status: 500, message : `There was a problem adding the user to the database, please try again` });
      }  

      //after all test is passed 
      return response
      .status(200)
      .json({status:200,  data : newUser.username, message : "Request sucessfull: "});
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

module.exports = signin;