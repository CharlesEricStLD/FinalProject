
"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

// const client = new MongoClient(MONGO_URI);

const collectionName = "centersConditions"
const database = "CrossCountryData"

// Get a specific center by his ID

const centerConditionsByName = async (request, response) => {
  
  const client = new MongoClient(MONGO_URI);

  const { centerName } = request.params;
  
  if (!centerName) {
  return response
  .status(401)
  .json({ status: 401,  message : "You need to provide a center Name to access this endoint"});
}    
    try {

      await client.connect();
      const db = client.db(database);
      console.log("connected!");

      //retrieve Id in the database 
      const center = await db.collection(collectionName).findOne({name : centerName});

      if (!center || center.matchedCount === 0) {
          return response
          .status(404)
          .json({ status: 404, message : `center not found, please verify the center Name : ${centerName} was not found` });
        }  

        //after all test is passed 
        return response
        .status(200)
        .json({status:200, message : "Request sucessfull: ", data : center });
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

module.exports = centerConditionsByName;
