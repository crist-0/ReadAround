import React, { useState } from "react";

import axios from "axios";

import CustomAlert from "../components/CustomAlert";

const BookAdd = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    publication_date: "",
    imageLink: "",
    imageFile: null,
  });

  const [imagePreview, setImagePreview] = useState("");
  // const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });

    // If the image link field is updated, update the preview
    if (name === "imageLink") {
      setImagePreview(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBook({ ...book, imageFile: file });

    // Create a local preview of the uploaded image
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if either an image link or file is provided
    if (!book.imageLink && !book.imageFile) {
      alert("Please provide an image file or link.");
      return;
    }

    // Build form data for submission
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("genre", book.genre);
    formData.append("description", book.description);
    formData.append("publication_date", book.publication_date);

    if (book.imageFile) {
      formData.append("imageFile", book.imageFile); // File upload
      formData.append("fileupload", true); // File upload    
    } else {
      formData.append("cover_image", book.imageLink); // Link upload
      formData.append("imageFile", null); // File upload    
      formData.append("fileupload", false); // File upload    
    }

    try {

        console.log(formData);
        typeof(formData.fileupload)
        const response = "";
        if (!formData.imageFile)
        {
                    
            const response = await axios.post("http://localhost:7000/api/books/add", formData, {
              headers: {
                "Content-Type": "application/json",
              },
            });          

            if (response.status === 200 || response.status === 201) {
              alert("Book added successfully!");
              setBook({
                title: "",
                author: "",
                genre: "",
                description: "",
                publication_date: "",
                imageLink: "",
                imageFile: null,
              });
              setImagePreview("");
            
            } else {
              alert("Failed to add book.");
            }
          }
          else
        {
          const response = await axios.post("http://localhost:7000/api/books/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
      

      } catch (error) {
        console.error("Error adding book:", error);
        alert("An error occurred while adding the book.");
      }
    }
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Add New Book
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-800 dark:text-gray-200 font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-gray-800 dark:text-gray-200 font-semibold mb-2"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={book.author}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="genre"
              className="block text-gray-800 dark:text-gray-200 font-semibold mb-2"
            >
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={book.genre}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-800 dark:text-gray-200 font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={book.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="publication_date"
              className="block text-gray-800 dark:text-gray-200 font-semibold mb-2"
            >
              Publication Date
            </label>
            <input
              type="date"
              id="publication_date"
              name="publication_date"
              value={book.publication_date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-800 dark:text-gray-200 font-semibold mb-2"
            >
              Cover Image
            </label>
            <input
              type="text"
              name="imageLink"
              placeholder="Paste image link here"
              value={book.imageLink}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
            />
            <div className="mb-2 text-gray-600 dark:text-gray-400">or</div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          {imagePreview && (
            <div className="mb-4">
              <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">
                Image Preview:
              </p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-40 h-60 object-cover rounded-lg"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 dark:bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};




export default BookAdd;
