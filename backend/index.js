"use strict";

const {getCenterById} = require("./handlers") 

// build your server here

// consider making one or more handler files to ease the  division of work

const express = require("express");
const morgan = require("morgan");

// const { MongoClient } = require("mongodb");
// require("dotenv").config();
// const { MONGO_URI } = process.env;
// Need to add the updated MONGO_URI to the .env file in server folder

const PORT = 8000;

express()

.use(morgan("tiny"))
.use(express.json())

.get("/test", (req, res) => {
  res.json({ message: "You hit the end point!" });
})

.get("/center/:centerId", getCenterById)

//test MongoDB get w/ db & collection names used as examples, 
.get("/api/testMongo", async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const result = await client
      .db("portfolio-project")
      .collection("people")
      .insertOne({ name: "Jimmy" });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "something went wrong" });
  } finally {
    await client.close();
  }
})

 // this is our catch all endpoint.
.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Error, this endpoint was not found... 404.",
  });
})



.listen(PORT, () => console.log(`Listening on port ${PORT}`));

