const express = require("express");

const router = express.Router();
const Book = require("../models/bookModel");


// get a book using specific filters that are passed from the frontend.
router.post("/get", (req, res) => {

});

// return a book specified by the id.
router.get("/:id", (req,res) => {

});


// add a book to the database ( admin only )
router.post("/add", async (req, res) => {
   const { title , author, genre, description, publication_date, cover_image, imageFile, fileupload } = req.body;

   console.log(title,author,genre,description,fileupload);

   if (!title || !author || !genre || !description) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }

   if (!fileupload)
    {
        console.log("hi");
        console.log(imageFile);
    }
    else
    {
        try
        {

            const existingBook = await Book.findOne({title });
            if (existingBook) {
                return res.status(400).json({ message : "Book already added" });
            }

            const newBook = new Book({
                title : title,
                author : author,
                genre : genre,
                description : description,
                cover_image : cover_image,
                publication_date : publication_date
            });
    
            await newBook.save()
    
            res.status(201).json({ message : " Book registered successfully ", book : newBook});
        }
        catch(error) {
            console.error("Error during book registration : ", error);
            res.status(500).json({ message : "server error", error_message : `${error}` });
        }
    }
});











// update a book information ( admin only )

router.put("/:id", (req, res) => {

});



// delete a book entirely from the database. ( admin only )

router.delete("/:id", (req, res) => {

})


module.exports = router;