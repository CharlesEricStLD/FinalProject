//Remove favorite from list 


"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

// const client = new MongoClient(MONGO_URI);

const collectionName = "users"
const database = "CrossCountryData"

// modify a comment accepted value from false to true

const removeComment = async (request, response) => {
  
  const client = new MongoClient(MONGO_URI);

  const { favorite } = request.body;

  const {username, centerId } = favorite;
  
  if (!favorite || !username || !centerId) {
  return response
  .status(401)
  .json({ status: 401,  message : "You need to provide an Id to access this endoint"});
}    
    try {

      await client.connect();
      const db = client.db(database);
      console.log("connected!");

      const favoriteRemoved = await db.collection(collectionName).updateOne({username : username }, {$pull : {"favorite" : {$in : [centerId]}  }});


      if (!favoriteRemoved || favoriteRemoved.matchedCount === 0) {
          return response
          .status(404)
          .json({ status: 404, _id, message : `comment not found, please verify the center with an id of  ${centerId} and the comment with an _id of  ${_id} ` });
        }  

        //after all test is passed 
        return response
        .status(200)
        .json({status:200, message : "Request sucessfull: ", data : favorite });
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

module.exports = removeComment;