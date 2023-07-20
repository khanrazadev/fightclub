import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/layout/header/Header';
import Home from './component/home/Home';
import Courses from './component/Courses/Courses';
import Footer from './component/layout/Footer/Footer';
import Login from './component/Auth/Login';
import Signup from './component/Auth/Signup';
import ForgetPassword from './component/Auth/ForgetPassword';
import ResetPassword from './component/Auth/ResetPassword';
import Contact from './component/Contact/Contact';
import Request from './component/Request/Request';
import About from './component/About/About';
import NotFound from './component/layout/NotFound/NotFound';
import PaymentSuccess from './component/Payments/PaymentSuccess';
import PaymentFail from './component/Payments/PaymentFail';
import Subscribe from './component/Payments/Subscribe';
import CourseDetail from './component/CourseDetail/CourseDetail';
import Profile from './component/Profile/Profile';
import UpdateProfile from './component/Profile/UpdateProfile';
import ChangePassword from './component/Profile/ChangePassword';
function App() {
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/paymentfail" element={<PaymentFail />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Request />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
