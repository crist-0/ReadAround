import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
import DoctorRegisterPage from './pages/DoctorRegisterPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/Admin';
import DoctorPanel from './pages/DoctorPanel';
import Profile from './pages/Profile';
import Recommendations from './pages/Recommendations';
import ResetPassword from './components/ResetPassword'
import BookPage from './pages/BookPage';
import BookAdd from './pages/BookAdd';


const App = () => {
  return (
    <Router>
      <div className="bg-custom h-screen">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-doctor" element={<DoctorRegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/doctor" element={<DoctorPanel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rec" element={<Recommendations />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/bookpage" element={ <BookPage />} />
          <Route path="/addbook" element={ <BookAdd />} />

        </Routes>
      </div>

    </Router>
  );
};

export default App;
