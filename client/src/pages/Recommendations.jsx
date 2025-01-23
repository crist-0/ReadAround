import React from "react";
import BookCard from "../components/BookCard";

const Recommendations = () => {
  return (
    <>
      <div className="bg-gray-900 min-h-screen">
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-white pt-9 text-center py-7">
          Your Recommendations
        </h1>

        {/* Recommendations Grid */}
        <div className="pt-4 bg-gray-800 px-6 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BookCard
              book={{
                name: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                year: 1925,
                genre: "Classic Fiction",
                coverImage:
                  "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471173936/the-great-gatsby-9781471173936_hr.jpg",
                rating: 4,
              }}
            />
            <BookCard
              book={{
                name: "1984",
                author: "George Orwell",
                year: 1949,
                genre: "Dystopian Fiction",
                coverImage:
                  "https://images.penguinrandomhouse.com/cover/9780451524935",
                rating: 5,
              }}
            />
            <BookCard
              book={{
                name: "To Kill a Mockingbird",
                author: "Harper Lee",
                year: 1960,
                genre: "Classic Fiction",
                coverImage:
                  "https://images.penguinrandomhouse.com/cover/9780061120084",
                rating: 5,
              }}
            />
            <BookCard
              book={{
                name: "Pride and Prejudice",
                author: "Jane Austen",
                year: 1813,
                genre: "Romance",
                coverImage:
                  "https://m.media-amazon.com/images/I/81A-mvlo+QL._AC_UF1000,1000_QL80_.jpg",
                rating: 4.5,
              }}
            />
            <BookCard
              book={{
                name: "The Catcher in the Rye",
                author: "J.D. Salinger",
                year: 1951,
                genre: "Classic Fiction",
                coverImage:
                  "https://m.media-amazon.com/images/I/81OthjkJBuL._AC_UF1000,1000_QL80_.jpg",
                rating: 4,
              }}
            />
            <BookCard
              book={{
                name: "The Hobbit",
                author: "J.R.R. Tolkien",
                year: 1937,
                genre: "Fantasy",
                coverImage:
                  "https://m.media-amazon.com/images/I/91b0C2YNSrL._AC_UF1000,1000_QL80_.jpg",
                rating: 5,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommendations;
