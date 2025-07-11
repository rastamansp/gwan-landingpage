import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../infrastructure/context/auth-context';

interface RegisterWizardProps {
  onRegisterSuccess?: (userData: any) => void;
}

const RegisterWizard: React.FC<RegisterWizardProps> = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    activationCode: '',
  });

  // Dados do usuário retornados pelo backend
  const [userData, setUserData] = useState({
    userId: '',
    email: '',
  });

  const steps = [
    'Informações Básicas',
    'Ativação da Conta'
  ];

  const handleBack = () => {
    navigate('/');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Salvar o userId retornado pelo backend
        setUserData({
          userId: data.userId,
          email: formData.email,
        });
        setSuccess('Conta criada! Verifique seu email para ativar.');
        setActiveStep(1);
      } else {
        setError(data.message || 'Erro ao criar conta');
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/activate/${userData.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activationCode: formData.activationCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Conta ativada! Fazendo login automático...');
        
        // Usar token retornado pela ativação para login automático
        if (data.token && data.userData) {
          // Fazer login com token retornado pela ativação
          login(data.token, data.userData);
          
          setTimeout(() => {
            navigate('/upload');
            if (onRegisterSuccess) {
              onRegisterSuccess(data.userData);
            }
          }, 1000);
        } else {
          // Fallback: se não retornou token, fazer login tradicional
          try {
            const loginResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/login-request`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ contact: formData.email }),
            });

            const loginData = await loginResponse.json();

            if (loginData.success) {
              // Simular código de login (em produção seria enviado por email)
              const validateResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/login-validate`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                  contact: formData.email, 
                  loginCode: loginData.loginCode 
                }),
              });

              const validateData = await validateResponse.json();

              if (validateData.success) {
                // Salvar token e dados do usuário
                login(validateData.token, validateData.userData);
                
                setTimeout(() => {
                  navigate('/upload');
                  if (onRegisterSuccess) {
                    onRegisterSuccess(validateData.userData);
                  }
                }, 1000);
              }
            }
          } catch (loginError) {
            console.error('Erro no login automático:', loginError);
            // Se falhar o login automático, redirecionar para login manual
            setTimeout(() => {
              navigate('/');
            }, 2000);
          }
        }
      } else {
        setError(data.message || 'Código inválido');
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
              {steps[0]}
            </h2>
            
            {error && (
              <div style={{ 
                backgroundColor: '#f8d7da', 
                color: '#721c24', 
                padding: '10px', 
                borderRadius: '4px', 
                marginBottom: '20px' 
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleStep1Submit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  placeholder="+5511999999999"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleBack}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: loading ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Criando...' : 'Criar Conta'}
                </button>
              </div>
            </form>
          </div>
        );

      case 1:
        return (
          <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
              {steps[1]}
            </h2>
            
            {success && (
              <div style={{ 
                backgroundColor: '#d4edda', 
                color: '#155724', 
                padding: '10px', 
                borderRadius: '4px', 
                marginBottom: '20px' 
              }}>
                {success}
              </div>
            )}

            {error && (
              <div style={{ 
                backgroundColor: '#f8d7da', 
                color: '#721c24', 
                padding: '10px', 
                borderRadius: '4px', 
                marginBottom: '20px' 
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <p style={{ textAlign: 'center', color: '#666' }}>
                Digite o código de ativação enviado para:
              </p>
              <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {userData.email}
              </p>
            </div>

            <form onSubmit={handleStep2Submit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Código de Ativação *
                </label>
                <input
                  type="text"
                  value={formData.activationCode}
                  onChange={(e) => handleInputChange('activationCode', e.target.value)}
                  required
                  maxLength={6}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    textAlign: 'center',
                    letterSpacing: '2px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setActiveStep(0)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: loading ? '#ccc' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Ativando...' : 'Ativar Conta'}
                </button>
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ 
          backgroundColor: '#007bff', 
          color: 'white', 
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>
            Cadastro - Passo {activeStep + 1} de {steps.length}
          </h1>
        </div>

        {/* Progress Bar */}
        <div style={{ 
          backgroundColor: '#e9ecef', 
          height: '4px',
          position: 'relative'
        }}>
          <div style={{
            backgroundColor: '#007bff',
            height: '100%',
            width: `${((activeStep + 1) / steps.length) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default RegisterWizard; 