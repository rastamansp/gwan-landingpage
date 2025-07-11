import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import App from './App';
import { AuthProvider } from './modules/auth/infrastructure/context/auth-context';

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

// Wrapper para testes com todos os providers necessários
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      {children}
    </AuthProvider>
  </ThemeProvider>
);

test('renders app without crashing', () => {
  render(
    <TestWrapper>
      <App />
    </TestWrapper>
  );
  // Verifica se a aplicação renderiza sem erros
  expect(document.body).toBeInTheDocument();
});
