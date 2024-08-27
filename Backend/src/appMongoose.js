const { connect } = require("mongoose");
const MONGO_DB_URL = "mongodb+srv://rahul:rahul107@cluster0.mao2iq0.mongodb.net";
const DB_NAME = "cs-library-app";
const connectDb = async () => {
    try {
        await connect(`${MONGO_DB_URL}/${DB_NAME}`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}
connectDb();

module.exports = {};