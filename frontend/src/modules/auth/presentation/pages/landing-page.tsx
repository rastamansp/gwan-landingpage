import React from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAllAuthData } from '../../infrastructure/context/auth-context';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleClearAuthData = () => {
    clearAllAuthData();
    window.location.reload();
  };

  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <h1 style={{ 
        color: '#1976d2', 
        marginBottom: '1rem',
        fontSize: '2.5rem'
      }}>
        Gwan Landing Page
      </h1>

      <h2 style={{ 
        color: '#666', 
        marginBottom: '3rem',
        fontSize: '1.5rem'
      }}>
        Faça upload de suas imagens de forma simples e segura
      </h2>

      {/* Botão temporário para limpar dados */}
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={handleClearAuthData}
          style={{
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          🧹 Limpar Dados de Autenticação (DEV)
        </button>
      </div>

      {/* Opções de Acesso */}
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9'
      }}>
        <h3 style={{ marginBottom: '2rem' }}>
          Como você gostaria de acessar?
        </h3>

        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          {/* Opção Login */}
          <div>
            <button
              onClick={handleLoginClick}
              style={{
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '4px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                width: '100%',
                marginBottom: '0.5rem'
              }}
            >
              Já tenho conta
            </button>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Acesse com email ou WhatsApp
            </p>
          </div>

          {/* Opção Cadastro */}
          <div>
            <button
              onClick={handleRegisterClick}
              style={{
                backgroundColor: 'transparent',
                color: '#1976d2',
                border: '2px solid #1976d2',
                padding: '1rem 2rem',
                borderRadius: '4px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                width: '100%',
                marginBottom: '0.5rem'
              }}
            >
              Quero me cadastrar
            </button>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Crie sua conta em 2 passos
            </p>
          </div>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ color: '#666', marginBottom: '0.5rem' }}>
          ✨ Upload seguro de imagens
        </p>
        <p style={{ color: '#666', marginBottom: '0.5rem' }}>
          🔐 Autenticação em 2 passos
        </p>
        <p style={{ color: '#666' }}>
          📱 Suporte para email e WhatsApp
        </p>
      </div>
    </div>
  );
};

export default LandingPage; 