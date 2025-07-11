import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { LoginForm } from '../login-form';
import { AuthProvider } from '../../../infrastructure/context/auth-context';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Mock fetch
global.fetch = jest.fn();

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('exemplo@email.com ou +5511999999999')).toBeInTheDocument();
    expect(screen.getByText('Solicitar Código')).toBeInTheDocument();
  });

  it('shows contact step initially', () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    expect(screen.getByText('Digite seu email ou WhatsApp para receber o código de acesso')).toBeInTheDocument();
    expect(screen.queryByText('Digite o código de 6 dígitos')).not.toBeInTheDocument();
  });

  it('handles contact submission successfully', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Código enviado com sucesso',
      }),
    } as Response);

    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const contactInput = screen.getByPlaceholderText('exemplo@email.com ou +5511999999999');
    const submitButton = screen.getByText('Solicitar Código');

    fireEvent.change(contactInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login-request'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ contact: 'test@example.com' }),
        })
      );
    });
  });

  it('shows error message on contact submission failure', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: false,
        message: 'Contato não encontrado',
      }),
    } as Response);

    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const contactInput = screen.getByPlaceholderText('exemplo@email.com ou +5511999999999');
    const submitButton = screen.getByText('Solicitar Código');

    fireEvent.change(contactInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Contato não encontrado')).toBeInTheDocument();
    });
  });

  it('transitions to code step after successful contact submission', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Código enviado com sucesso',
      }),
    } as Response);

    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const contactInput = screen.getByPlaceholderText('exemplo@email.com ou +5511999999999');
    const submitButton = screen.getByText('Solicitar Código');

    fireEvent.change(contactInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Digite o código de 6 dígitos enviado para test@example.com')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('000000')).toBeInTheDocument();
    });
  });

  it('handles code submission successfully', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    
    // Mock contact submission
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Código enviado com sucesso',
      }),
    } as Response);

    // Mock code validation
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Login realizado com sucesso',
        token: 'jwt-token',
        userData: {
          id: 'user-123',
          name: 'John Doe',
          email: 'test@example.com',
        },
      }),
    } as Response);

    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    // Submit contact
    const contactInput = screen.getByPlaceholderText('exemplo@email.com ou +5511999999999');
    const submitButton = screen.getByText('Solicitar Código');

    fireEvent.change(contactInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Digite o código de 6 dígitos enviado para test@example.com')).toBeInTheDocument();
    });

    // Submit code
    const codeInput = screen.getByPlaceholderText('000000');
    const codeSubmitButton = screen.getByText('Entrar');

    fireEvent.change(codeInput, { target: { value: '123456' } });
    fireEvent.click(codeSubmitButton);
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login-validate'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ 
            contact: 'test@example.com', 
            loginCode: '123456' 
          }),
        })
      );
    });
  });
}); 