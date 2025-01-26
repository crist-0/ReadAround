import React, { useState, useCallback, useEffect } from "react";
import BookCard from "./BookCard";

const Carousel = ({ books }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Cycle to the next slide
  const cycleSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % books.length);
  }, [books.length]);

  useEffect(() => {
    const intervalId = setInterval(cycleSlide, 3000);
    return () => clearInterval(intervalId);
  }, [cycleSlide]);

  const handlePrevClick = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
  }, [books.length]);

  const handleNextClick = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % books.length);
  }, [books.length]);

  return (
    <div className="w-full ">
      {/* Carousel Title */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
        Get Personalised Recommendation
      </h2>

      <div id="default-carousel" className="relative w-full " data-carousel="slide">
        {/* Carousel wrapper */}
        <div className="relative h-96 overflow-hidden rounded-lg bg-transparent">
          {books.map((book, index) => (
            <div
              key={book.name}
              className={`duration-700 ease-in-out absolute inset-0  ${
                index === activeIndex ? "opacity-100" : "opacity-0 invisible"
              }`}
              style={{ backgroundColor: "transparent" }} // Make each carousel item transparent
              data-carousel-item
            >
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
                <BookCard
                  book={book}
                  style={{ height: "100%", width: "100%", backgroundColor: "transparent" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {books.map((_, index) => (
            <button
              key={`indicator-${index}`}
              type="button"
              className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-blue-500" : "bg-gray-600"}`}
              aria-current={index === activeIndex ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>

        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={handlePrevClick}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-transparent group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={handleNextClick}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-transparent group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
