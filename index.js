const mongoose = require('mongoose');
const express = require("express");
const dotenv = require("dotenv");
const userSchema = require("./Model/user.js")
const cloudinary = require('cloudinary').v2;
const port = 300
const app = express()
dotenv.config()
const userRoutes = require('./routes/user.js')
const attendenceRoutes = require('./routes/attendence.js')


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {

    console.log("MongoDB connected");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
})

// Parse JSON request bodies
app.use(express.json());

cloudinary.config({
    cloud_name:"dawfvgxhw",
    api_key:"572553139527543",
    api_secret:"9gCDB11x-yVlSYtR59Pwrmjiws0",
});

app.get('/', (req, res) => {
    res.status(200).send({
        status: 200,
        msg: 'ABCD'
    })
})

app.use('/user', userRoutes)
app.use('/attendence', attendenceRoutes)
// Connecting






// app.post("/user", async (req, res) => {
//     const userBody = req.body;
//     try {
//         const newUser = new userSchema({ ...userBody });
//         await newUser.save();
//         res.status(200).send("User has been created!");
//     } catch (error) {
//         console.error("Error saving user:", error);
//         res.status(500).send(error.message);
//     }

// });





    app.listen(port, () => {
        console.log('Server is running on port ' + port);
    });