import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OAuth2Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setError('No token received. Authentication failed.');
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    (async () => {
      try {
        await login(token);
        // Redirect to home after successful login
        navigate('/');
      } catch (err) {
        setError('Failed to process authentication. Please try again.');
        setTimeout(() => navigate('/login'), 3000);
      }
    })();
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {error ? (
          <>
            <h2 className="text-2xl font-bold text-red-600">Authentication Error</h2>
            <p className="text-gray-600 mt-2">{error}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900">Processing Login...</h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
            <p className="text-gray-600">Please wait while we complete your login.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuth2Callback;
