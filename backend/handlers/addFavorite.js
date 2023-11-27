
"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const collectionName = "users"
const database = "CrossCountryData"

const addFavorite = async (request, response) => {
  const {favorite} = request.body
  const {centerId, username} = favorite;

  if (!favorite) {
    return response
    .status(401)
    .json({ status: 401,  message : "Please provide a centerID to provide to favorite"});
  } 

  try {

    await client.connect();
    const db = client.db(database);
    console.log("connected!");

    const favoriteAdded = await db.collection(collectionName).updateOne(
      { username: username },
      { $addToSet :{ favorite : centerId } }
  );

  console.log(favoriteAdded);

    if (!favoriteAdded, favoriteAdded.matchedCount === 0 && favoriteAdded.modifiedCount === 0) {
      return response
      .status(401)
      .json({ status: 401, message : `You need to be login to add or remove favorite` });
    }

    if (favoriteAdded.modifiedCount === 0) {
      return response
      .status(401)
      .json({ status: 401, message : `This favorite already exist in your favorite list :)` });
    }

    //after all test is passed 
    return response
    .status(200)
    .json({status:200,  data : favoriteAdded, message : "Request sucessfull: "});
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

module.exports = addFavorite;

