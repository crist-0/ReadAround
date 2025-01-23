// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import  axios  from "axios"

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     phone: "",
//   });
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Basic validation
//     if (!formData.username || !formData.email || !formData.password || !formData.phone) {
//       setError("All fields are required.");
//       setMessage("");
//       return;
//     }
//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       setMessage("");
//       return;
//     }
  
//     // API call to register user using Axios
//     try {
//       const response = await axios.post("http://127.0.0.1:7000/api/register/user", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       // Handle success
//       setMessage("Registration successful!");
//       setError("");
  
//       // Navigate to login after 2 seconds
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (error) {
//       // Handle errors from the server or network
//       if (error.response && error.response.data) {
//         setError(error.response.data.message || "Failed to register. Please try again.");
//       } else {
//         console.log(error);
//         setError("Something went wrong. Please try again.");
//       }
//       setMessage("");
//     }
//   };
  

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   if (!formData.username || !formData.email || !formData.password || !formData.phone) {
//   //     setError("All fields are required.");
//   //     setMessage("");
//   //     return;
//   //   }
//   //   if (formData.password.length < 6) {
//   //     setError("Password must be at least 6 characters.");
//   //     setMessage("");
//   //     return;
//   //   }

//   //   setMessage("Registration successful!");
//   //   setError("");

//   //   setTimeout(() => {
//   //     navigate("/login");
//   //   }, 2000);
//   // };

//   return (
//     <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
//       <div className="w-full max-w-md  rounded-lg shadow border bg-gray-800 border-gray-700">
//         <div className="p-6 space-y-6 sm:p-8">
//           <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//             Create an Account
//           </h1>
//           {message && (
//             <div className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-900">
//               {message}
//             </div>
//           )}
//           {error && (
//             <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-900">
//               {error}
//             </div>
//           )}
//           <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label
//                 htmlFor="username"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Username
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 id="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 placeholder="Enter your username"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="name@example.com"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 id="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Enter your phone number"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-purple-800"
//             >
//               Register
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Register;


// new code with input data validation

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Inline validation
    if (name === "username" && value.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Invalid email format.");
    } else if (name === "password" && value.length < 6) {
      setError("Password must be at least 6 characters long.");
    } else if (name === "phone" && (!/^\d+$/.test(value) || value.length !== 10)) {
      setError("Phone number must be exactly 10 digits and contain only numbers.");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.phone) {
      setError("All fields are required.");
      setMessage("");
      return;
    }
    if (formData.username.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      setMessage("");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Invalid email format.");
      setMessage("");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setMessage("");
      return;
    }
    if (!/^\d+$/.test(formData.phone) || formData.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits and contain only numbers.");
      setMessage("");
      return;
    }

    // API call to register user using Axios
    try {
      const response = await axios.post("http://127.0.0.1:7000/api/register/user", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle success
      setMessage("Registration successful!");
      setError("");

      // Navigate to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Handle errors from the server or network
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Failed to register. Please try again.");
      } else {
        console.log(error);
        setError("Something went wrong. Please try again.");
      }
      setMessage("");
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md  rounded-lg shadow border bg-gray-800 border-gray-700">
        <div className="p-6 space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an Account
          </h1>
          {message && (
            <div className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-900">
              {message}
            </div>
          )}
          {error && (
            <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-900">
              {error}
            </div>
          )}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-purple-800"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
