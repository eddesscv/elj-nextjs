// components/GoogleOneTap.tsx
import React, { useEffect } from 'react';
import {
  CredentialResponse,
  GoogleLogin,
  useGoogleLogin,
} from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';

interface GoogleOneTapProps {
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}

export const GoogleOneTap: React.FC<GoogleOneTapProps> = ({
  onSuccess,
  onError,
}) => {
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      // This will automatically show the One Tap UI
      const timer = setTimeout(() => {
        // You can also manually trigger One Tap here if needed
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const handleSuccess = async (response: CredentialResponse) => {
    try {
      // For One Tap, the response contains a credential (JWT)
      const credential = response.credential;

      if (credential) {
        // Decode the JWT to get user info (you can also verify it on your server)
        const payload = JSON.parse(atob(credential.split('.')[1]));

        const user = {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          avatar: payload.picture,
          ranking: Math.floor(Math.random() * 1000) + 1,
          totalScore: Math.floor(Math.random() * 10000) + 1000,
          quizzesCompleted: Math.floor(Math.random() * 100) + 10,
          joinDate: new Date().toISOString().split('T')[0],
          provider: 'google',
        };

        login(user);
        onSuccess?.(user);
      }
    } catch (error) {
      console.error('Google One Tap error:', error);
      onError?.(error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap={true}
      auto_select={true}
      cancel_on_tap_outside={false}
      context="signin"
      ux_mode="popup"
    />
  );
};
