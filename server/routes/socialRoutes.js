const express = require("express");

const router = express.Router();

const Social = require("../models/socialconnectionModel");

const cors = require("cors");


router.post("/check",async (req, res) => {

    const { follower, following } = req.body;

    if (!follower || !following) {
        return res.status(400).json({ message: "Follower and following IDs are required." });
    }

    try
    {
        const isFollowing = await Social.findOne({
            follower_id: follower,
            followed_id: following
        })
        
        if(isFollowing) {
            return res.status(200).json({ message: "Already following" });
        }

    }
    catch(err)
    {
        console.error("Error while checking",error);
        res.status(500).json({ message : "server error",error });
    }
});


router.post("/follow", async (req, res) => {
    const { follower, following } = req.body;

    if (!follower || !following) {
        return res.status(400).json({ message: "Follower and following IDs are required." });
    }

    if (follower === following) {
        return res.status(400).json({ message: "User cannot follow themselves." });
    }

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

        console.log(newConnection)

        res.status(201).json({
            message: "new connection added"
        })
    }
    catch(error)
    {
        console.error("Error while processing follow request",error);
        res.status(500).json({ message : "server error",error });
    }


})

router.delete("/unfollow", async (req, res) => {
    const { follower, followed } = req.body;
  
    // Validate request body
    if (!follower || !followed) {
      return res.status(400).json({ message: "Missing required fields: follower and followed" });
    }
  
    try {
      const response = await Social.deleteOne({
        follower_id: follower,
        followed_id: followed,
      });
  
      if (response.deletedCount > 0) {
        return res.status(200).json({ message: "Unfollowed successfully" });
      } else {
        return res.status(404).json({ message: "User not found or not following" });
      }
    } catch (error) {
      console.error("Error while unfollowing:", error);
      return res.status(500).json({ message: "Server error", error });
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
