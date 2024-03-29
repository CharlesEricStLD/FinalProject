
const {centerById, allCentersByRegion, signin, logIn, addFavorite, showFavorites, addComment, allCommentsAdmin, approvedComment, removeFavorite, allCentersInformation, centerConditionsByName, allRegions} = require("./handlers") 

const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

express()

.use(morgan("tiny"))
.use(express.json())

.get("/test", (req, res) => {
  res.json({ message: "You hit the end point!" });
})

.get("/api/allcentersinformation", allCentersInformation)

.get("/api/allRegions", allRegions)

.get("/api/center/:centerId", centerById)

.get("/api/centersCondition/:centerName", centerConditionsByName)

.get("/api/region/:region", allCentersByRegion)

.post("/api/signin", signin)

.post("/api/login", logIn)

.patch("/api/addfavorite", addFavorite)

.post("/api/showfavorites", showFavorites)

.post("/api/addcomment", addComment)

.get("/api/admin/allcomments", allCommentsAdmin)

.patch("/api/approvedcomment", approvedComment)

.patch("/api/removefavorite", removeFavorite)

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
  } catch (error) {
    console.log(error.stack);
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

