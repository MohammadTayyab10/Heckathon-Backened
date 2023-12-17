const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema(
    {
        img: { type: mongoose.SchemaTypes.String, required: true },
       
        user: { type: mongoose.SchemaTypes.ObjectId, ref: "user", required: true },
    },
    { timestamps: true }
);

const attendance = mongoose.model('attendance', attendanceSchema)

module.exports = attendance