const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userid: {type: String, required: [true, 'User ID is requied'] },
    username: {type: String, required: [true, 'User Name is requied'] },
    email: {type: String, required: [true, 'Email is requied'] },
    name: {type: String, required: [true, 'Name is requied'] },
    password: {type: String, required: [true, 'Password is requied'] },
    role: {type: String, required: [true, 'Role is requied'] },

})

module.exports = mongoose.model('User', userSchema);