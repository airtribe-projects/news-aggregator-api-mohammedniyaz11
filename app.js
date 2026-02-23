require("dotenv").config();
const express = require("express");
const app = express()
const {connectDB}=require("./db")

connectDB()

const authRoutes = require("./routes/authRoutes");
const preferenceRoutes = require("./routes/prefernceRoute");
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/preferences", preferenceRoutes);


// app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;