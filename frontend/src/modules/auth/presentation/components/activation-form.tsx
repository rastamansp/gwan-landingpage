import React, { useState } from 'react';
import { ActivateUserUseCase } from '../../application/use-cases/activate-user.use-case';
import { ActivateUserRequest } from '../../application/dtos/auth.dto';
import { AuthApiService } from '../../infrastructure/services/auth-api.service';

interface ActivationFormProps {
  userId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const ActivationForm: React.FC<ActivationFormProps> = ({ 
  userId, 
  onSuccess, 
  onError 
}) => {
  const [activationCode, setActivationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const authApiService = new AuthApiService();
  const activateUserUseCase = new ActivateUserUseCase(authApiService);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6); // Only digits, max 6
    setActivationCode(value);
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const request: ActivateUserRequest = { activationCode };
      const result = await activateUserUseCase.execute(userId, request);
      
      if (result.success) {
        onSuccess();
      } else {
        setError(result.error || 'Activation failed');
        onError(result.error || 'Activation failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verify Your Account
        </h2>
        <p className="text-gray-600">
          We've sent a 6-digit code to your email and phone. Enter it below to activate your account.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="activationCode" className="block text-sm font-medium text-gray-700 mb-1">
            Activation Code
          </label>
          <input
            type="text"
            id="activationCode"
            value={activationCode}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="000000"
            maxLength={6}
            required
          />
          {error && (
            <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || activationCode.length !== 6}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
            isLoading || activationCode.length !== 6
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Verifying...' : 'Activate Account'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Didn't receive the code?
        </p>
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          onClick={() => {
            // TODO: Implement resend functionality
            alert('Resend functionality will be implemented');
          }}
        >
          Resend Code
        </button>
      </div>
    </div>
  );
}; 