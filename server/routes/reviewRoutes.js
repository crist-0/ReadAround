const express = require("express");

const router = express.Router();
const Review = require("../models/reviewModel");
const Comment = require("../models/commentModel");

// add a review to the database..
router.post("/add",async (req, res) =>
{

    const {title , review, rating, book_id, user_id} = req.body;
    try
    {
        const newReview = new Review({
            user_id: user_id,
            book_id: book_id,
            rating: rating,
            comment: review
        });
    
        await newReview.save();
        
        res.status(201).json({
            messsage : "new review added "
        })
    }
    catch(error)
    {
        console.error("Error while adding new review : ",error);
        res.status(500).json({ message : "server error",error });
    }
})

// request  reviews from the database 
// router.post("/get" , (req, res) => {
    
// })

router.get("/get",async (req, res) => {
    const user_id = req.query.id;
    const book_id  = req.query.bid;
    console.log("testtt ----------------------",book_id);
    if (user_id)
    {
        console.log("hello");

        const response = await Review.find({ user_id : user_id });
    
        if(!response)
        {
            return res.status(400).json({ message : "Reviews not found" })
        }
        else
        {
            return res.status(200).json({ message : "Success",
                data : response.map( data => ({
                    user_id: data.user_id,
                    review_id: data.id,
                    book_id: data.book_id,
                    rating: data.rating,
                    comment: data.comment,
                    date: data.updated_at
                }) )
             })
        }
        
    }
    else if(book_id)
    {
        console.log(book_id);    
        console.log("hello");
        const response = await Review.find({ book_id : book_id });
    
        if(!response)
        {
            return res.status(400).json({ message : "Reviews not found" })
        }
        else
        {
            return res.status(200).json({ message : "Success",
                data : response.map( data => ({
                    user_id: data.user_id,
                    review_id: data.id,
                    book_id: data.book_id,
                    rating: data.rating,
                    comment: data.comment,
                    date: data.updated_at
                }) )
             })
        }
    }
})


// adding new reviews to the database
router.post("/:reviewid/comments" ,async (req, res) => {
    const review_id = req.params.reviewid;
    const { user_id, content } = req.body;
    console.log("Parameters ="+req.params.reviewid);
    console.log("review_id = "+review_id+" user_id = "+user_id+" content = "+content);
    try
    {
        const newComment = new Comment({
            user_id: user_id,
            review_id: review_id,
            content: content
        })
    
        await newComment.save();
        
        res.status(201).json({
            messsage : "new comment added"
        })
    }
    catch(error)
    {
        console.error("Error while adding new comment : ",error);
        res.status(500).json({ message : "server error",error });
    }
})

router.put("/:reviewId",async (req, res) => {
    const {text, rating} = req.body;
    const review_id = req.params.reviewId;
    try
    {
        const response = await Review.updateOne({
            _id: review_id
        },
        {
            comment: text,
            rating: rating,
            updated_at: Date.now()
        });

        if(response.modifiedCount > 0){
            res.status(200).json({
                message: "review updated successfully"
            })
        }
        else
        {
            res.status(404).json({
                message: "Review not found"
            })
        }
    }
    catch(error)
    {
        console.error("Error while updating the review : ",error);
        res.status(500).json({ message : "server error",error });

    }
});


//fetch comments from backend
router.get("/:reviewid/comments",async (req, res) => {
    try{

        const review_id = req.params.reviewid;

        const response = await Comment.find({
            review_id: review_id
        });

        if(!response){
            return res.status(400).json({
                message: "Comments not found"
            })
        }
        else{
            return res.status(200).json({
                message: "Success",
                data: response.map(  data => ({
                    comment: data.content,
                    user_id: data.user_id
                }))
            })
        }

    }
    catch(error){
        console.error("Error while fetching comments for the review : ",error);
        res.status(500).json({ message : "server error",error });
    }
})

//fetch comments from backend
router.get("/comments/:userId",async (req, res) => {
    try{

        const user_id = req.params.userId;

        const response = await Comment.find({
            user_id: user_id
        });

        if(!response){
            return res.status(400).json({
                message: "Comments not found"
            })
        }
        else{
            return res.status(200).json({
                message: "Success",
                data: response.map(  data => ({
                    id: data._id,
                    comment: data.content,
                }))
            })
        }

    }
    catch(error){
        console.error("Error while getting the review for the user : ",error);
        res.status(500).json({ message : "server error",error });
    }
})



//delete a review

router.delete("/:review_id",async (req,res) =>{
    const review_id = req.params.review_id;
    try{
        const response = await Review.deleteOne({
            _id: review_id
        })

        if(response.deletedCount > 0)
        {
            res.status(200).json({
                message: "review deleted sucessfully"
            });
        }
        else
        {
            res.status(500).json({
                message: "Could not delete the review"
            })
        }
    }
    catch(error)
    {
        console.error("Error while deleting : ",error);
        res.status(500).json({
            message: "server error", error
        });
    }

})


// delete a comment
router.delete("/:commentId/comment",async (req, res) => {
    try{
        const comment_id = req.params.commentId;

        const response = await Comment.deleteOne({
            _id: comment_id
        })
        if(response.deletedCount > 0)
            {
                res.status(200).json({
                    message: "comment deleted sucessfully"
                });
            }
        else
            {
                console.log(response);
                res.status(500).json({
                    message: "Could not delete the comment"
                });
            }
    }
    catch(error){
        console.error("Error while deleting : ",error);
        res.status(500).json({
            message: "server error", error
        });
    }

})
module.exports = router;