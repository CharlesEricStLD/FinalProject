
"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const collectionName = "comments"
const database = "CrossCountryData"

// {username : "", centerID: "", text : setComment, date : Date(), accepted : falsed  }


const addComment = async (request, response) => {
  
  const client = new MongoClient(MONGO_URI);

  const {comment} = request.body; 

  const {username, centerId, text, date} = comment;

  if (!comment || !username || !centerId || !text || !date) {
    return response
    .status(401)
    .json({ status: 401,  message : "Please provide a comment with the corect format"});
  } 

  //makebetter
  //add failsafe so only active user can add comment about existing center

  try {

    await client.connect();
    const db = client.db(database);
    console.log("connected!");

    const commentAdded = await db.collection(collectionName).insertOne({...comment});

    //after all test is passed 
    return response
    .status(200)
    .json({status:200,  data : comment, message : "Request sucessfull: "});
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

module.exports = addComment;

