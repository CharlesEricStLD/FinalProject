
"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const { MONGO_URI } = process.env;

const collectionName = "centers"
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

    const validUser = await db.collection(collectionName).findOne({username : username});

    if (!validUser) {
      return response
      .status(401)
      .json({ status: 401, message : `You need to be login to add review` });
    }

    const commentAdded = await db.collection(collectionName).updateOne({_id : centerId},
    { $addToSet :{ comments : {...comment, _id : uuidv4()} } })

    if (!commentAdded, commentAdded.matchedCount === 0 && commentAdded.modifiedCount === 0) {
      return response
      .status(401)
      .json({ status: 401, message : `You need to provide a valid center id` });
    }

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

