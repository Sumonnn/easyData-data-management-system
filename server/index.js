const express = require("express");
const app = express();

//import the routes
const profileRoutes = require("./routes/Auth");
const userRoutes = require("./routes/User");

const database = require("./config/database");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 4000;


//database connect
database.connect();


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173/",
        credentials: true,
    })
)

//define routes
app.use("/api/v1/auth", profileRoutes);
app.use("/api/v1/user", userRoutes);


//def route or root route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})