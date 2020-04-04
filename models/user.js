const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    userid : {type : String , required: true, unique: true, dropDups: true},
    password : {type : String, required : true}
})
module.exports = mongoose.model('Users', userschema)