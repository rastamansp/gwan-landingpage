import React, { useState } from 'react';
import { RegisterForm } from '../components/register-form';
import { ActivationForm } from '../components/activation-form';
import { ProfileCompletionForm } from '../components/profile-completion-form';

type AuthStep = 'register' | 'activate' | 'complete' | 'success';

export const AuthPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('register');
  const [userId, setUserId] = useState<string>('');
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRegisterSuccess = (newUserId: string) => {
    setUserId(newUserId);
    setCurrentStep('activate');
    setError('');
  };

  const handleActivationSuccess = () => {
    setCurrentStep('complete');
    setError('');
  };

  const handleProfileCompletionSuccess = (imageUrl: string) => {
    setProfileImageUrl(imageUrl);
    setCurrentStep('success');
    setError('');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'register':
        return (
          <RegisterForm
            onSuccess={handleRegisterSuccess}
            onError={handleError}
          />
        );

      case 'activate':
        return (
          <ActivationForm
            userId={userId}
            onSuccess={handleActivationSuccess}
            onError={handleError}
          />
        );

      case 'complete':
        return (
          <ProfileCompletionForm
            userId={userId}
            onSuccess={handleProfileCompletionSuccess}
            onError={handleError}
          />
        );

      case 'success':
        return (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Gwan!
            </h2>
            <p className="text-gray-600 mb-6">
              Your account has been successfully created and activated.
            </p>
            {profileImageUrl && (
              <div className="mb-6">
                <img 
                  src={profileImageUrl} 
                  alt="Profile" 
                  className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-green-200"
                />
              </div>
            )}
            <button
              onClick={() => {
                // TODO: Navigate to dashboard or home page
                alert('Navigation to dashboard will be implemented');
              }}
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepIndicator = () => {
    const steps = [
      { key: 'register', label: 'Register', active: currentStep === 'register' },
      { key: 'activate', label: 'Activate', active: currentStep === 'activate' },
      { key: 'complete', label: 'Complete', active: currentStep === 'complete' },
      { key: 'success', label: 'Success', active: currentStep === 'success' }
    ];

    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.key}>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.active 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step.active ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-8 h-0.5 bg-gray-300"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gwan Landing Page
          </h1>
          <p className="text-gray-600">
            Create your account in just 3 simple steps
          </p>
        </div>

        {getStepIndicator()}

        {error && (
          <div className="max-w-md mx-auto mb-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {renderStep()}
      </div>
    </div>
  );
}; 