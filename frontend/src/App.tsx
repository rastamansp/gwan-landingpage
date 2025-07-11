import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { useAuth } from './modules/auth/infrastructure/context/auth-context';
import LandingPage from './modules/auth/presentation/pages/landing-page';
import RegisterWizard from './modules/auth/presentation/components/register-wizard';
import { LoginForm } from './modules/auth/presentation/components/login-form';
import { CharacterUpload } from './modules/auth/presentation/components/character-upload';
import { LoadingSpinner } from './modules/auth/presentation/components/loading-spinner';

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

// Componente para rotas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  console.log('🔒 ProtectedRoute - user:', user?.name, 'isAuthenticated:', isAuthenticated);
  
  if (!user) {
    console.log('❌ Usuário não autenticado, redirecionando para /');
    return <Navigate to="/" replace />;
  }
  
  console.log('✅ Usuário autenticado, permitindo acesso');
  return <>{children}</>;
};

// Componente para rotas públicas (redireciona usuários autenticados)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  console.log('🌐 PublicRoute - user:', user?.name, 'isAuthenticated:', isAuthenticated);
  
  if (user) {
    console.log('✅ Usuário autenticado, redirecionando para /upload');
    return <Navigate to="/upload" replace />;
  }
  
  console.log('❌ Usuário não autenticado, permitindo acesso');
  return <>{children}</>;
};

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Router>
          <Routes>
            <Route 
              path="/" 
              element={
                <PublicRoute>
                  <LandingPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <RegisterWizard />
                </PublicRoute>
              } 
            />
            <Route 
              path="/upload" 
              element={
                <ProtectedRoute>
                  <CharacterUpload />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
