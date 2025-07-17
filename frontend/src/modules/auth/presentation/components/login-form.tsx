import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../infrastructure/context/auth-context';
import { buildApiUrl, debugApiConfig } from '../../../../config/api';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { Login, ArrowBack } from '@mui/icons-material';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState<'contact' | 'code'>('contact');
  const [contact, setContact] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Debug da configuração da API
    debugApiConfig();

    try {
      const apiUrl = buildApiUrl('/auth/login-request');
      console.log('🔗 Fazendo requisição para:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact }),
      });

      const data = await response.json();
      console.log('📡 Resposta do servidor:', data);

      if (data.success) {
        setSuccess('Código enviado! Verifique seu email ou WhatsApp.');
        setStep('code');
      } else {
        setError(data.message || 'Erro ao solicitar código');
      }
    } catch (error) {
      console.error('❌ Erro na requisição:', error);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = buildApiUrl('/auth/login-validate');
      console.log('🔗 Fazendo requisição para:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          contact, 
          loginCode 
        }),
      });

      const data = await response.json();
      console.log('📡 Resposta do servidor:', data);

      if (data.success) {
        // Fazer login com token retornado
        login(data.token, data.user);
        setSuccess('Login realizado com sucesso! Redirecionando...');
        
        setTimeout(() => {
          navigate('/upload');
        }, 1000);
      } else {
        setError(data.message || 'Código inválido');
      }
    } catch (error) {
      console.error('❌ Erro na requisição:', error);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleBackToContact = () => {
    setStep('contact');
    setError(null);
    setSuccess(null);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: 'background.default',
      p: 2
    }}>
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={handleBack}
              sx={{ mr: 2 }}
            >
              Voltar
            </Button>
            <Typography variant="h5" component="h1">
              Login
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {step === 'contact' ? (
            <form onSubmit={handleContactSubmit}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Digite seu email ou WhatsApp para receber o código de acesso
              </Typography>

              <TextField
                fullWidth
                label="Email ou WhatsApp"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="exemplo@email.com ou +5511999999999"
                required
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading || !contact.trim()}
                startIcon={loading ? <CircularProgress size={20} /> : <Login />}
                sx={{ mb: 2 }}
              >
                {loading ? 'Enviando...' : 'Solicitar Código'}
              </Button>

              <Typography variant="body2" color="text.secondary" align="center">
                Não tem uma conta?{' '}
                <Button
                  variant="text"
                  onClick={() => navigate('/register')}
                  sx={{ p: 0, minWidth: 'auto' }}
                >
                  Cadastre-se aqui
                </Button>
              </Typography>
            </form>
          ) : (
            <form onSubmit={handleCodeSubmit}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Digite o código de 6 dígitos enviado para {contact}
              </Typography>

              <TextField
                fullWidth
                label="Código de Acesso"
                value={loginCode}
                onChange={(e) => setLoginCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                required
                inputProps={{ maxLength: 6 }}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading || loginCode.length !== 6}
                startIcon={loading ? <CircularProgress size={20} /> : <Login />}
                sx={{ mb: 2 }}
              >
                {loading ? 'Verificando...' : 'Entrar'}
              </Button>

              <Button
                fullWidth
                variant="text"
                onClick={handleBackToContact}
                disabled={loading}
                sx={{ mb: 2 }}
              >
                Usar outro contato
              </Button>

              <Typography variant="body2" color="text.secondary" align="center">
                Não recebeu o código?{' '}
                <Button
                  variant="text"
                  onClick={handleContactSubmit}
                  disabled={loading}
                  sx={{ p: 0, minWidth: 'auto' }}
                >
                  Reenviar
                </Button>
              </Typography>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}; 