import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from 'protected-route-react';

//import components
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
import Dashboard from './component/Admin/Dashboard/Dashboard';
import AdminCourses from './component/Admin/AdminCourses/AdminCourses';
import CreateCourse from './component/Admin/CreateCourse/CreateCourse';
import Users from './component/Admin/Users/Users';

// Import Redux hook
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile } from './redux/actions/userAction';

function App() {
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  //accessing user redux state using useSelector
  const { isAuthenticated, user, message, error } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute
              isAuthenticated={!isAuthenticated}
              redirect="/profile"
            >
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
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

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/createcourse" element={<CreateCourse />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/users" element={<Users />} />
      </Routes>
      {/* react toaster */}
      <Toaster />
      <Footer />
    </Router>
  );
}

export default App;
