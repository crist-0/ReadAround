const express = require("express");

const router = express.Router();
const Review = require("../models/reviewModel");


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
router.post("/get" , (req, res) => {
    
})

router.get("/get",async (req, res) => {
    const user_id = req.query.id;
    const book_id  = req.query.bid;
    console.log(book_id);
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
                    comment: data.comment
                }) )
             })
        }
    }
})

module.exports = router;