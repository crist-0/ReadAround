const express = require("express");
const cors = require("cors");

const Book = require("../models/bookModel");
const Review = require("../models/reviewModel");

const router = express.Router()

router.use(cors());

router.get("/books", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;

        const books = await Book.aggregate([ { $sample: { size: limit}} ]);
        res.json({books, nextPage: page + 1});
    }
    catch(err)
    {
        res.status(500).json({ error: "Server Error" });
    }
});

router.get("/reviews", async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = 10;

        const reviews = await Review.aggregate([
            { $sample: { size: limit } },
            {
                $lookup: {
                    from: "books",
                    localField: "book_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            { $unwind: "$book" }
        ]);

        res.json({ reviews, nextPage: page + 1});
    }
    catch(err)
    {
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;