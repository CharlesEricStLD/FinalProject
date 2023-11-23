//Sign In endpoint where we ceate the user an validate that his 
//username is not taken 

 //FETCH POST

  //BAckedn : 
  //Add user to db with : 
  // user = {
    // "id"
    // username : "BOB", (LOWERCASE in BACKEND)
    // password : "pass1" 
  //}
  //

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
    .json({ status: 401,  message : "You need to provide a username and a password to access this endoint"});
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