import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import OAuth2Callback from './pages/OAuth2Callback';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/books" element={<BookList />} />
                <Route path="/books/:id" element={<BookDetail />} /> {/* ✅ QUAN TRỌNG */}

                <Route path="/cart" element={<Cart />} />

                <Route path="/admin" element={<Admin />} />
                <Route path="/oauth2/callback" element={<OAuth2Callback />} />

                {/* Profile page for both user and admin (data from /home/token-info via AuthContext) */}
                <Route path="/profile" element={<Profile />} />

                <Route
                  path="/forgot-password"
                  element={
                    <div className="max-w-7xl mx-auto px-4 py-12">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h1>
                      <p className="text-gray-600">
                        Please contact support or use the password recovery feature when it is available.
                      </p>
                    </div>
                  }
                />

                <Route
                  path="/sell-books"
                  element={
                    <div className="max-w-7xl mx-auto px-4 py-12">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">Sell Your Books</h1>
                      <p className="text-gray-600">Selling books online is coming soon.</p>
                    </div>
                  }
                />

                <Route
                  path="/membership"
                  element={
                    <div className="max-w-7xl mx-auto px-4 py-12">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">Membership</h1>
                      <p className="text-gray-600">Membership benefits will be available soon.</p>
                    </div>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>

        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;