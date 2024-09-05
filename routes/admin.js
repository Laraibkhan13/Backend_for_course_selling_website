const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {admin}=require('../db')
const jwt=require('jsonwebtoken');
const {jwtpass}=require('../config');
const { course } = require('../db')

// Admin Routes
router.post('/signup', async (req, res) => {
    // admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    await admin.create({
        username:username,
        password:password
    })
    res.json({
        msg:"admin created suceesfully"
    })

});

router.post('/signin', async(req, res) => {
    // admin signin logic
    const username=req.body.username;
    const password=req.body.password;

    const verify=await admin.findOne({
        username,
        password
    })

    if(verify)
    {
        const token=jwt.sign({username},jwtpass)
        res.json({
            token
        })
    }
    else{
        res.json({
            msg:"incorrect username or pass"
        })
    }


});

router.post('/courses', adminMiddleware, async(req, res) => {
    //  course creation logic
     const title=req.body.title;
     const description=req.body.description;
     const price=req.body.price;
     const imageLink=req.body.imageLink;

     await course.create({
        title,
        description,
        price,
        imageLink
     })

     res.json({
        msg:"course created successfulluy"
     })


});

router.get('/courses', adminMiddleware,async (req, res) => {
    //  fetching all courses logic

    const response=await course.find({});

    res.json({
        courses:response
    })
});

module.exports = router;