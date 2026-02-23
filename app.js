require("dotenv").config();
const express = require("express");
const app = express()
const {connectDB}=require("./db")

connectDB()

const authRoutes = require("./routes/auth.route");
const preferenceRoutes = require("./routes/prefernce.route");
const newsRoutes = require("./routes/news.route");

;
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api/news", newsRoutes)


// app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;