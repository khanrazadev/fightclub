import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import { getMyProfile } from './redux/actions/user';
import Loader from './component/layout/Loader/Loader';
import useToastNotification from './hooks/useToastNotification';

function App() {
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  //accessing user redux state using useSelector
  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();
  useToastNotification({ error, message });

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  return (
    <Router>
      <>
        <Header isAuthenticated={isAuthenticated} user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request" element={<Request />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/paymentfail" element={<PaymentFail />} />

          {/* protected routes */}
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CourseDetail user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resetpassword/:token"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect="/profile"
              >
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgetpassword"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect="/profile"
              >
                <ForgetPassword />
              </ProtectedRoute>
            }
          />
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
          <Route
            path="/register"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect="/profile"
              >
                <Signup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateprofile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdateProfile user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/changepassword"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscribe"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Subscribe user={user} />
              </ProtectedRoute>
            }
          />
          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                adminRoute={true}
                isAdmin={user && user.role === 'admin'}
                isAuthenticated={isAuthenticated}
              >
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/createcourse"
            element={
              <ProtectedRoute
                adminRoute={true}
                isAdmin={user && user.role === 'admin'}
                isAuthenticated={isAuthenticated}
              >
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute
                adminRoute={true}
                isAdmin={user && user.role === 'admin'}
                isAuthenticated={isAuthenticated}
              >
                <AdminCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute
                adminRoute={true}
                isAdmin={user && user.role === 'admin'}
                isAuthenticated={isAuthenticated}
              >
                <Users />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* react toaster */}
        <Toaster />
        <Footer />
      </>
    </Router>
  );
}

export default App;
