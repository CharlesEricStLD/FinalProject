const { MongoClient } = require("mongodb");

require("dotenv").config();
const { v4: uuidv4 } = require('uuid');


const centers = [ {
  _id : uuidv4(),
  image : "https://m1.quebecormedia.com/emp/emp/62216354_2615382654865a-73cc-4c33-bc1d-8479a3cd3d50_ORIGINAL.jpg?impolicy=crop-resize&x=0&y=0&w=1000&h=667&width=960",
  Name : "Ski Montagne coupée",
  Region : "Laurentides",
  Url : "https://skidefondstjeanmatharaquettelanaudiere.com/",
  
  contact : {
  courriel : "<info@skimontagnecoupee.com>",
  facebook : " @skimontagnecoupee",
  Phone : "450 886-3845",
  website : "https://skidefondstjeanmatharaquettelanaudiere.com/",
  }
}]

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI);

const exportDataToMongoDb = async (data,collectionName,dbName ) => {
  try {
    
    await client.connect();
    
    const db = client.db(dbName);
    console.log("connected!");

    const result = await db.collection(collectionName).insertMany(data);

  }
catch (error) {
  console.error(error.stack);
}
finally {
  await client.close();
  console.log("disconnected!");
}

}

// exportDataToMongoDb(reservations, "flightReservations");
exportDataToMongoDb(centers, "centers","CrossCountryData");
