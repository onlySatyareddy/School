import React, { useState, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/store';

// Lazy loaded components
const EntryScene = lazy(() => import('./3d/EntryScene'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));
const CampusScene = lazy(() => import('./3d/CampusScene'));
const About = lazy(() => import('./pages/About'));
const Admission = lazy(() => import('./pages/Admission'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));
const NotFound = lazy(() => import('./pages/NotFound'));

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardSidebar from './components/DashboardSidebar';
import LoadingScreen from './components/LoadingScreen';
import { NotificationProvider } from './context/NotificationContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/home" />;
  
  return children;
};

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScene, setShowScene] = useState(location.pathname === '/');
  
  const isDashboard = ['/admin', '/student', '/teacher'].some(path => location.pathname.startsWith(path));

  const handleEnterCampus = () => {
    setShowScene(false);
    navigate('/home');
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex' }}>
      {isDashboard && <div className="dashboard-sidebar"><DashboardSidebar /></div>}
      <div className="dashboard-main" style={{ flex: 1, marginLeft: isDashboard ? '260px' : '0' }}>
        {(!showScene && !isDashboard) && <Navbar />}
        <Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<EntryScene onEnter={handleEnterCampus} />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/login" element={<Login />} />
              <Route path="/campus-3d" element={<CampusScene />} />
              
              {/* Protected Routes */}
              <Route path="/admin/*" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/student/*" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/teacher/*" element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
      {(!showScene && !isDashboard) && <Footer />}
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <Router>
          <AppContent />
        </Router>
      </NotificationProvider>
    </Provider>
  );
}

export default App;
