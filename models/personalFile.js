var mongoose = require("mongoose");

var FileSchema = mongoose.Schema({
    minorInfo: {
        surname: String,
        name: String,
        middle_name: String,
        gender: String,
        age: Number
    },
    studyInfo: {
        qualification: String,
        profile: String,
        faculty: String,
        dept: String,
        groupNumber: Number,
        recordBookNumber: Number,
    },
    username: String,
},
    { versionKey: false }
);

var File = mongoose.model("File", FileSchema);
module.exports = File;