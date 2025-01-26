require('dotenv').config('../.env');

const mongoose = require("mongoose");

const Book = require("../models/bookModel");


const MONGODB_URL = "mongodb://localhost:27017/book0_db";

console.log(MONGODB_URL)

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const bookData =  [cd ../
    {
       title: "The Midnight Library",
       author: "Matt Haig",
       genre: "Fiction",
       description: "A novel about life's infinite possibilities and second chances",
       cover_image: "/images/midnight-library.jpg",
       publication_date: new Date("2020-09-29"),
       number_of_reviews: 25346,
       average_rating: 4.3
     },
     {
       title: "Normal People",
       author: "Sally Rooney",
       genre: "Fiction",
       description: "A complex love story exploring class, social dynamics, and personal growth",
       cover_image: "/images/normal-people.jpg", 
       publication_date: new Date("2018-08-28"),
       number_of_reviews: 18752,
       average_rating: 4.1
     },
   
     {
       title: "Sapiens: A Brief History of Humankind",
       author: "Yuval Noah Harari",
       genre: "Non-Fiction",
       description: "An exploration of human history and evolution",
       cover_image: "/images/sapiens.jpg",
       publication_date: new Date("2014-02-10"),
       number_of_reviews: 45231,
       average_rating: 4.6
     },
     {
       title: "Atomic Habits",
       author: "James Clear",
       genre: "Non-Fiction",
       description: "A guide to building good habits and breaking bad ones",
       cover_image: "/images/atomic-habits.jpg",
       publication_date: new Date("2018-10-16"),
       number_of_reviews: 38291,
       average_rating: 4.7
     },
   
     {
       title: "The Name of the Wind",
       author: "Patrick Rothfuss",
       genre: "Fantasy",
       description: "First book in the Kingkiller Chronicle about a legendary wizard",
       cover_image: "/images/name-of-wind.jpg",
       publication_date: new Date("2007-03-27"),
       number_of_reviews: 32456,
       average_rating: 4.5
     },
     {
       title: "The Way of Kings",
       author: "Brandon Sanderson",
       genre: "Fantasy",
       description: "Epic fantasy novel set in the complex world of Roshar",
       cover_image: "/images/way-of-kings.jpg",
       publication_date: new Date("2010-08-31"),
       number_of_reviews: 28716,
       average_rating: 4.7
     },
     // Mystery Books
     {
       title: "Gone Girl",
       author: "Gillian Flynn",
       genre: "Mystery",
       description: "A psychological thriller about a missing woman and her husband",
       cover_image: "/images/gone-girl.jpg",
       publication_date: new Date("2012-06-05"),
       number_of_reviews: 29384,
       average_rating: 4.2
     },
     {
       title: "The Girl with the Dragon Tattoo",
       author: "Stieg Larsson",
       genre: "Mystery",
       description: "A dark investigative thriller featuring Lisbeth Salander",
       cover_image: "/images/dragon-tattoo.jpg",
       publication_date: new Date("2005-08-01"),
       number_of_reviews: 36521,
       average_rating: 4.1
     },
   
     {
       title: "Project Hail Mary",
       author: "Andy Weir",
       genre: "Science Fiction",
       description: "A space exploration novel about saving humanity",
       cover_image: "/images/hail-mary.jpg",
       publication_date: new Date("2021-05-04"),
       number_of_reviews: 22145,
       average_rating: 4.6
     },
     {
       title: "Dune",
       author: "Frank Herbert",
       genre: "Science Fiction",
       description: "A complex science fiction epic set on a desert planet",
       cover_image: "/images/dune.jpg",
       publication_date: new Date("1965-08-01"),
       number_of_reviews: 45231,
       average_rating: 4.4
     },
   
     {
       title: "Into the Wild",
       author: "Jon Krakauer",
       genre: "Adventure",
       description: "A true story of survival and self-discovery in the Alaskan wilderness",
       cover_image: "/images/into-wild.jpg",
       publication_date: new Date("1996-01-20"),
       number_of_reviews: 18273,
       average_rating: 4.3
     },
     {
       title: "The Lost City of Z",
       author: "David Grann",
       genre: "Adventure",
       description: "A narrative of exploration and mystery in the Amazon rainforest",
       cover_image: "/images/lost-city-z.jpg",
       publication_date: new Date("2009-02-24"),
       number_of_reviews: 15632,
       average_rating: 4.2
     }
     ,
   {
       title: "A Little Life",
       author: "Hanya Yanagihara",
       genre: "Fiction",
       description: "An intense exploration of friendship, trauma, and human resilience",
       cover_image: "/images/little-life.jpg",
       publication_date: new Date("2015-03-10"),
       number_of_reviews: 19845,
       average_rating: 4.4
     },
     {
       title: "The Goldfinch",
       author: "Donna Tartt",
       genre: "Fiction",
       description: "A Pulitzer Prize-winning novel about loss, survival, and art",
       cover_image: "/images/goldfinch.jpg",
       publication_date: new Date("2013-10-22"),
       number_of_reviews: 16732,
       average_rating: 4.2
     },
   
     {
       title: "Educated",
       author: "Tara Westover",
       genre: "Non-Fiction",
       description: "A memoir of self-discovery and educational transformation",
       cover_image: "/images/educated.jpg",
       publication_date: new Date("2018-02-20"),
       number_of_reviews: 24561,
       average_rating: 4.5
     },
     {
       title: "Bad Blood",
       author: "John Carreyrou",
       genre: "Non-Fiction",
       description: "Investigative account of the Theranos startup fraud",
       cover_image: "/images/bad-blood.jpg",
       publication_date: new Date("2018-05-21"),
       number_of_reviews: 18234,
       average_rating: 4.6
     },
   
     {
       title: "The Night Circus",
       author: "Erin Morgenstern",
       genre: "Fantasy",
       description: "A magical competition between two illusionists in a mystical circus",
       cover_image: "/images/night-circus.jpg",
       publication_date: new Date("2011-09-13"),
       number_of_reviews: 22456,
       average_rating: 4.3
     },
     {
       title: "Good Omens",
       author: "Neil Gaiman & Terry Pratchett",
       genre: "Fantasy",
       description: "A comedic tale about preventing the apocalypse",
       cover_image: "/images/good-omens.jpg",
       publication_date: new Date("1990-05-01"),
       number_of_reviews: 18765,
       average_rating: 4.4
     },
   
     {
       title: "The Silent Patient",
       author: "Alex Michaelides",
       genre: "Mystery",
       description: "A psychological thriller about a woman's mysterious silence",
       cover_image: "/images/silent-patient.jpg",
       publication_date: new Date("2019-02-05"),
       number_of_reviews: 21987,
       average_rating: 4.3
     },
     {
       title: "Big Little Lies",
       author: "Liane Moriarty",
       genre: "Mystery",
       description: "A complex narrative about secrets among suburban mothers",
       cover_image: "/images/big-little-lies.jpg",
       publication_date: new Date("2014-07-29"),
       number_of_reviews: 19456,
       average_rating: 4.2
     },
   
     {
       title: "The Three-Body Problem",
       author: "Cixin Liu",
       genre: "Science Fiction",
       description: "A complex sci-fi novel exploring first contact and cosmic civilizations",
       cover_image: "/images/three-body.jpg",
       publication_date: new Date("2008-01-01"),
       number_of_reviews: 24321,
       average_rating: 4.5
     },
     {
       title: "Neuromancer",
       author: "William Gibson",
       genre: "Science Fiction",
       description: "A cyberpunk classic exploring virtual reality and artificial intelligence",
       cover_image: "/images/neuromancer.jpg",
       publication_date: new Date("1984-07-01"),
       number_of_reviews: 29876,
       average_rating: 4.4
     }
   ];

   async function insertBooks() {
    try {
        const result = await Book.insertMany(bookData);
        console.log(`${result.length} books inserted successfully`);
    }
    catch(error)
    {
        console.log("Error inserting books:", error);
    }
    finally {
        mongoose.connection.close();
    }
   }

   insertBooks();