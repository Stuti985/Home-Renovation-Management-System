import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';

// Static imports for core layout components
import Sidebar from './components/Sidebar';
import PublicNavbar from './components/PublicNavbar';
import Footer from './components/Footer';
import './App.css';

// Lazy loaded page components (Code Splitting)
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const Projects = lazy(() => import('./pages/Projects'));
const Bookings = lazy(() => import('./pages/Bookings'));
const Notifications = lazy(() => import('./pages/Notifications'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const Contractors = lazy(() => import('./pages/Contractors'));
const ContractorProfile = lazy(() => import('./pages/ContractorProfile'));
const Gallery = lazy(() => import('./pages/Gallery'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ComingSoon = lazy(() => import('./pages/ComingSoon'));

// Premium Loading Skeleton for Suspense Fallback
const PageLoader = () => (
  <div className="app-loader" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-primary)' }}>
    <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid var(--border-color)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Loading Renovation Data...</p>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password'].some(p => location.pathname.includes(p));
  const isLandingPage = location.pathname === '/';
  const isComingSoon = location.pathname === '/coming-soon';
  const isDashboardLayout = !isAuthPage && !isLandingPage && !isComingSoon;

  return (
    <HelmetProvider>
      <ThemeProvider>
        <div className="app-layout">
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--glass-border)',
              },
            }}
          />
          
          {isDashboardLayout && <Sidebar />}
          {isLandingPage && <PublicNavbar />}
          
          <main className={`main-content ${!isDashboardLayout ? 'full-width' : ''}`}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/verify-email/:token" element={<VerifyEmail />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <PrivateRoute>
                      <Projects />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/projects/:id"
                  element={
                    <PrivateRoute>
                      <ProjectPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/bookings"
                  element={
                    <PrivateRoute>
                      <Bookings />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <PrivateRoute>
                      <Notifications />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/gallery"
                  element={
                    <PrivateRoute>
                      <Gallery />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contractors"
                  element={
                    <PrivateRoute>
                      <Contractors />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contractors/:id"
                  element={
                    <PrivateRoute>
                      <ContractorProfile />
                    </PrivateRoute>
                  }
                />
                <Route path="/coming-soon" element={<ComingSoon />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            {isLandingPage && <Footer />}
          </main>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}
