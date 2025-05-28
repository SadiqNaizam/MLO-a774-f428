import React, { ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../components/layout/AuthLayout';
import LoginForm from '../components/Authentication/LoginForm';

// Infer the type of 'data' from the LoginForm's onLoginSuccess prop.
// This ensures type safety without needing to export LoginFormValues from LoginForm.tsx
// or redeclaring the type here.
// It extracts the type of the first parameter of the onLoginSuccess function.
// NonNullable is used because onLoginSuccess is an optional prop in LoginFormProps.
type LoginSuccessDataType = Parameters<
  NonNullable<ComponentProps<typeof LoginForm>['onLoginSuccess']>
>[0];

/**
 * LoginPage serves as the main authentication view for user login.
 * It utilizes AuthLayout for the overall page structure and centers the LoginForm component.
 * This page is responsible for handling navigation logic resulting from form actions
 * such as successful login, navigating to sign-up, or password recovery.
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Handles actions to be taken upon successful login.
   * @param data - The login form data, as inferred from LoginForm's onLoginSuccess prop.
   */
  const handleLoginSuccess = (data: LoginSuccessDataType) => {
    console.log('Login successful:', data);
    // In a real-world application, you would typically:
    // 1. Store authentication tokens (e.g., JWT in localStorage or HttpOnly cookie).
    // 2. Update application state with user information.
    // 3. Redirect to a protected area of the application (e.g., user dashboard).
    alert(`Login successful for ${data.email}. Redirecting to dashboard...`);
    navigate('/dashboard'); // Example: Navigate to the main application dashboard.
  };

  /**
   * Handles navigation to the sign-up page.
   */
  const handleNavigateToSignUp = () => {
    console.log('Navigating to Sign Up page...');
    navigate('/signup'); // Example: Navigate to the user registration page.
  };

  /**
   * Handles navigation to the forgot password page.
   */
  const handleNavigateToForgotPassword = () => {
    console.log('Navigating to Forgot Password page...');
    navigate('/forgot-password'); // Example: Navigate to the password recovery flow.
  };

  return (
    <AuthLayout>
      <LoginForm
        onLoginSuccess={handleLoginSuccess}
        onNavigateToSignUp={handleNavigateToSignUp}
        onNavigateToForgotPassword={handleNavigateToForgotPassword}
        // The LoginForm component is designed to be self-contained in terms of its
        // card-like appearance (width, padding, background, shadow, etc.),
        // as specified in the layout requirements for the main content area.
        // Therefore, no additional className prop is passed here for styling the form itself.
      />
    </AuthLayout>
  );
};

export default LoginPage;
