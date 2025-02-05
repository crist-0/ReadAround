import React, { useEffect } from 'react';
import axios from 'axios';
import Hero from "../components/Hero"
import Features from "../components/Features"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Carousel from "../components/Carousel"
import Paragraph from '../components/Paragraph';
import ReviewCard from '../components/ReviewCard';
import FeedPage from './FeedPage';

const Home = () => {

  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await axios.get('http://localhost:7000');
        console.log(response.data); // Should output 'Server is running on port 6000'
      } catch (error) {
        console.error('Error connecting to server:', error);
      }
    };

    checkServer();
  }, []);

  const books = [
      {
        coverImage: "https://images4.penguinrandomhouse.com/cover/9780593500491",
        name: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954,
        genre: "Fantasy",
        rating: 5,
      },
      {
        coverImage: "https://cdn.penguin.co.in/wp-content/uploads/2023/06/9780099549482-3.jpg",
        name: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        genre: "Southern Gothic",
        rating: 4,
      },
      {
        coverImage: "https://images.penguinrandomhouse.com/cover/9780451524935",
        name: "1984",
        author: "George Orwell",
        year: 1949,
        genre: "Dystopian",
        rating: 5,
      },
      {
        coverImage: "https://cdn.penguin.co.uk/dam-assets/books/9781405629423/9781405629423-jacket-large.jpg",
        name: "The Hobbit",
        author: "J.R.R. Tolkien",
        year: 1937,
        genre: "Fantasy",
        rating: 4,
      },
      {
        coverImage: "https://cdn.penguin.co.uk/dam-assets/books/9780141439518/9780141439518-jacket-large.jpg",
        name: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        genre: "Romance",
        rating: 5,
      },
  ];

  const exampleReview = {
    bookTitle: "The Great Gatsby",
    comment: "A captivating and timeless story of love and ambition.",
    rating: 5,
    date: "2025-01-22",
  }
  

  return  <div>
    { isLoggedIn ? <FeedPage /> : (

      <div className="bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
  {/* <Header></Header> */}
  <Navbar />
  <Hero></Hero>
  <Features />
  {/* <Carousel books={books}/> */}
  <Footer />
  {/* <Paragraph
  review="This book offers a brilliant insight into the world of AI and its implications on society. A must-read for tech enthusiasts and casual readers alike."
  rating={4}
  /> */}

  </div>
  ) }
  {/* <div className="bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">hdh</div> */}
</div>
};

export default Home;
