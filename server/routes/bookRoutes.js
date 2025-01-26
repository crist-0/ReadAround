const express = require("express");

const router = express.Router();
const Book = require("../models/bookModel");


// get a book using specific filters that are passed from the frontend.
router.post("/get", async (req, res) => {
    const { title, author , genre } = req.body;
    if (genre){
        const response =  await Book.find({ genre : genre });
        if(!response)
        {
            return res.status(400).json({ message : "Searched genre does not found" })
        }
        else
        {
            console.log(response);
            return res.status(200).json({ message : "Success", 
                data : 
                    response.map( data => ({
                        id : data._id,
                        title : data.title,
                        genre : data.genre,
                        cover_image : data.cover_image,
                        publication_date : data.publication_date,
                        number_of_reviews: data.number_of_reviews,
                        average_rating: data.average_rating
                    }) )
                
            })
        }
    }

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