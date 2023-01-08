// Importing Packages
import express from "express";
import ejs from "ejs"
import bodyParser from "body-parser";
import mongoose from "mongoose";

// Importing Files
import indexRoute from "./routes/index.js";

// Setting Package
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', true);

// Routes
app.use("/", indexRoute)

// Setting Connection
const PORT = 3000
const CONNECTION_URL = "MongoConnectionString"

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => 
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    )
    .catch((error) => console.log(error.message));