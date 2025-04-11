const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const client = new MongoClient("mongodb://mongo:27017");

app.get("/", async (req, res) => {
    await client.connect();
    const db = client.db("testdb");
    const collection = db.collection("visits");
    await collection.insertOne({ timestamp: new Date() });
    const count = await collection.countDocuments();
    res.send("Visit count: " + count);
});

app.listen(3000, () => console.log("App running on port 3000"));
