//endpoint of Admin to see all comments 


//Endpoint to retrieve in Database all the center of a specific region 

"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const collectionName = "centers"
const database = "CrossCountryData"

const allCommentsAdmin = async (request, response) => {

  const client = new MongoClient(MONGO_URI);

    try {

      await client.connect();
      const db = client.db(database);
      console.log("connected!");

      //retrieve Id in the database 
      const allComments = await db.collection(collectionName).distinct("comments");

      if (!allComments || allComments.matchedCount === 0) {
          return response
          .status(404)
          .json({ status: 404, allCenters, message : `comment not found or there was no comment in the collection` });
        }

        //after all test is passed 
        return response
        .status(200)
        .json({status:200, message : "Request sucessfull: ", data : allComments });
  
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

module.exports = allCommentsAdmin;