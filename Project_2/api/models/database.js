const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

let client;

const initDb = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI not found in .env");
    }

    client = new MongoClient(process.env.MONGODB_URI, {
        serverApi: {
            version: "1",
            strict: true,
            deprecationErrors: true
        },
    });

    await client.connect();
    console.log("Database connected!");
};

const getDb = () => {
    if (!client) throw new Error("DB not initialized. Call initDb first.");
    return client.db();
};

const getClient = () => {
    if (!client) {
        throw new Error("DB client not initialized. Call initDb() first.");
    }
    return client;
}

module.exports = { initDb, getDb, ObjectId, getClient };
