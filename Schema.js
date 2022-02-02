var mongoose= require('mongoose')
var validator = require('validator')


var emailSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
        lowerCase:true,
        validate:(value)=>{
            return validator.isEmail(value)
        }
    }
})
var studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        default:000000000
    }
})
const student =  mongoose.model('student',studentSchema)
const email = mongoose.model('email',emailSchema)
module.exports = {student,email}