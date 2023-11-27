//Endpoint to retrieve in Database all the center of a specific region 

"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const collectionName = "users"
const database = "CrossCountryData"

const showFavorites = async (request, response) => {

  const {username} = request.body;
  
  if (!username) {
  return response
  .status(401)
  .json({ status: 401,  message : "You need to provide a region to access this endoint"});
}    
    try {

      await client.connect();
      const db = client.db(database);
      console.log("connected!");

      //retrieve Id in the database 
      const userExist = await db.collection(collectionName).findOne({username : username});

      if (!userExist || userExist.matchedCount === 0) {
          return response
          .status(404)
          .json({ status: 404, message : `Your need to be login to see your favorite, please login with a valid username and password` });
        }  

        //after all test is passed 
        return response
        .status(200)
        .json({status:200, message : "Request sucessfull: ", data : userExist.favorite });
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

module.exports = showFavorites;