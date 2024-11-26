// app/components/AuthWrapper.js
"use client";

import { AuthProvider } from '../component/User'; // Adjust the path accordingly

const AuthWrapper = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default AuthWrapper;
