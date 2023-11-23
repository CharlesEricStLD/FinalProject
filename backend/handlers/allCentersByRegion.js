//Endpoint to retrieve in Database all the center of a specific region 

"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const collectionName = "centers"
const database = "CrossCountryData"

const allCentersByRegion = async (request, response) => {

  const { region } = request.params;
  
  if (!region) {
  return response
  .status(401)
  .json({ status: 401,  message : "You need to provide a region to access this endoint"});
}    
    try {

      await client.connect();
      const db = client.db(database);
      console.log("connected!");

      //retrieve Id in the database 
      const allCenters = await db.collection(collectionName).find({region : region}).toArray();

      if (!allCenters || allCenters.matchedCount === 0) {
          return response
          .status(404)
          .json({ status: 404, allCenters, message : `region not found, please verify the region name : ${region} was not found` });
        }  

        //after all test is passed 
        return response
        .status(200)
        .json({status:200, message : "region sucessfully found: ", data : allCenters });
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

module.exports = allCentersByRegion;