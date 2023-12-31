const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors');  // <-- Add this line for CORS
const userSchema = require("./Model/user.js")
const cloudinary = require('cloudinary').v2;
const port = 300
const app = express()
const userRoutes = require('./routes/user.js')
const attendenceRoutes = require('./routes/attendence.js')

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow specific origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,                 // Allow cookies
  optionsSuccessStatus: 204          // Return 204 status for preflight requests
};

app.use(cors(corsOptions));

mongoose.connect("mongodb+srv://HACK:UrT6yInrNMtifGAN@cluster0.y1ebbpj.mongodb.net/", {
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

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
