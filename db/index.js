const mongoose=require('mongoose');
const {mongoconnectionurl}=require('../config')
mongoose.connect(mongoconnectionurl);

const AdminSchema=mongoose.Schema({
    username:String,
    password:String
})

const UserSchema=mongoose.Schema({
    username:String,
    password:String,
    purchasedcourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
})

const CourseSchema=mongoose.Schema({
    title:String,
    description:String,
    price:String,
    imageLink:String

})

const admin=new mongoose.model('admin',AdminSchema);
const user=new mongoose.model('user',UserSchema);
const course=new mongoose.model('course',CourseSchema);

module.exports={
    admin,
    user,
    course
}