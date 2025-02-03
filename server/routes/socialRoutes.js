const express = require("express");

const router = express.Router();

const Social = require("../models/socialconnectionModel");

const cors = require("cors");


router.post("/follow", async (req, res) => {
    const { follower, following } = req.body;

    try{

        const isFollowing = await Social.findOne({
            follower_id: follower,
            followed_id: following
        })
        
        if(isFollowing) {
            return res.status(200).json({ message: "Already following" });
        }


        const newConnection = new Social({
            follower_id: follower,
            followed_id: following
        });

        await newConnection.save();

        return res.status(201).json({
            message: "new connection added"
        })
    }
    catch(error)
    {
        console.error("Error while processing follow request",error);
        return res.status(500).json({ message : "server error",error });
    }


})

router.delete( "/unfollow", async (req,res) =>
{
    const follower = req.body.follower;
    const followed = req.body.followed;

    // console.log("follower_id="+follower+"  followed_id="+followed);
    try{
        const response = await Social.deleteOne({
            follower_id: follower,
            followed_id: followed
        });

        if(response.deletedCount > 0)
        {
            res.status(200).json({
                message: "unfollowed sucessfully"
            });
        }
        else
        {
            console.log(response);
            res.status(404).json({
                message: "User not found or not following"
            });
        }
    }
    catch(error)
    {
        console.error("Error while unfollowing : ",error);
        res.status(500).json({ message : "server error",error });
    }
});


router.get('/followers/:fd',async (req, res) => {
    const followed_id = req.params.fd;
        const response = await Social.find({ followed_id: followed_id });
        if(!response)
            {
                return res.status(400).json({ message : "followers list does not found" })
            }
            else
            {
                console.log(response);
                return res.status(200).json({ message : "Success", 
                    data : response.map( response => ({
                        following_id: response.follower_id
                    }) )
                    
                })
            }
    }
);

//returns a following list

router.get("/:userId/following",async (req, res) => {
    const user_id = req.params.userId;

    try
    {
        const response = await Social.find({
            follower_id: user_id
        })

        res.status(200).json({
            data: response.map( data => ({
                    following: data.followed_id
            }) )
        })
    }
    catch(error)
    {
        console.error("Error while fetching data : ",error);
        res.status(500).json({ message : "server error",error });
    }
})


// returns a followers list

router.get("/:userId/followers",async (req, res) => {
    const user_id = req.params.userId;
    try
    {
        const response = await Social.find({
            followed_id: user_id
        })

        res.status(200).json({
            data: response.map( data => ({
                follower: data.follower_id
            }) )
        })
    }
    catch(error)
    {

    }
})


module.exports = router;
