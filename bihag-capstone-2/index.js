const express = require('express');
const mongoose = require('mongoose');

const cors = require("cors");

const userRoute = require("./routes/userRoute")

const app = express();

// Connecting to MongoDB Atlas
mongoose.connect("mongodb+srv://bihagrudolf:8qA9i7LoqkPq9IYU@wdc028-course-booking.8d6it54.mongodb.net/productsAPI",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

mongoose.connection.once("open", () => {
    console.log("Booting up J.A.R.V.I.S. LOCAL connection ...");
    setTimeout(() => {
        console.log("\x1b[33m J.A.R.V.I.S. LOCAL connection established. \x1b[0m");
    }, 3000); // Delay of 3000 milliseconds (3 seconds)
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// http://localhost:3000/users
app.use("/users", userRoute);


app.listen(3000, () => {
    console.log(`\x1b[31m Initializing J.A.R.V.I.S. ... \x1b[0m`);
    setTimeout(() => {
        console.log(`\x1b[93m Welcome back Sir!, J.A.R.V.I.S. is now ONLINE at port ${3000}. \x1b[0m`);
    }, 1000); // Delay of 1000 milliseconds (1 seconds)
});
