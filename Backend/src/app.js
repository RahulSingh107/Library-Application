require("./appMongoose")
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user-route")
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.listen(8080, () => {
    console.log(`Library app backend is running`);
});