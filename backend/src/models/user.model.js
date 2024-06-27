const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    password: {
        type: String
    }
});

const User =  mongoose.model("users", userSchema);

module.exports = User;