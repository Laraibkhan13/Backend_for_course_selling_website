const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {user}=require('../db');
const {course}=require('../db');
const jwt=require("jsonwebtoken");
const {jwtpass}=require('../config')

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const password=req.body.password;

    await user.create({
        username:username,
        password:password
    })

    res.json({
        msg:"user created successfully"
    })
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    const verify=await user.findOne({
        username:username,
        password:password
    })

    if(verify)
    {
        const token=jwt.sign({username},jwtpass); 
        res.json({
            token
        })
    }
    else{
        res.status(411).json({
            msg:"incorrect credentials"
        })
    }
    
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courses= await course.find({});

    res.json({
        courses:courses
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;
    const username=req.headers.username;

    await user.updateOne({
        username:username
    },
    {
        "$push":{
            purchasedcourses:courseId
        }
    })

    res.json({
        msg:"course purchased successfully"
    })

});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // fetching purchased courses logic
    const username=req.headers.username;

    const User=await user.findOne({
        username:username
    })

    const courses=await course.find({
        _id:{"$in":User.purchasedcourses}
    })

    res.json({
        couses:courses
    })
});

module.exports = router