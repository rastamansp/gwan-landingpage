import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Funções para gerenciar cookies
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Função para limpar todos os dados de autenticação
export const clearAllAuthData = () => {
  console.log('🧹 Limpando todos os dados de autenticação...');
  
  // Limpar localStorage
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  
  // Limpar cookies
  deleteCookie('auth_token');
  deleteCookie('auth_user');
  
  console.log('✅ Dados de autenticação limpos');
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    console.log('🚪 Fazendo logout...');
    setToken(null);
    setUser(null);
    // Limpar localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    // Limpar cookies
    deleteCookie('auth_token');
    deleteCookie('auth_user');
  }, []);

  const verifyToken = useCallback(async (authToken: string) => {
    try {
      console.log('🔍 Verificando token...', authToken.substring(0, 20) + '...');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        console.log('❌ Token inválido - status:', response.status);
        throw new Error('Token invalid');
      }

      const data = await response.json();
      console.log('📡 Response data:', data);
      
      if (data.success) {
        console.log('✅ Token válido, usuário:', data.user);
        setUser(data.user);
        return true;
      } else {
        console.log('❌ Token inválido - success false');
        throw new Error('Token invalid');
      }
    } catch (error) {
      console.error('❌ Token verification failed:', error);
      logout();
      return false;
    }
  }, [logout]);

  useEffect(() => {
    console.log('🔄 Inicializando AuthProvider...');
    
    const initializeAuth = async () => {
      // Tentar obter token do cookie primeiro, depois localStorage como fallback
      let savedToken = getCookie('auth_token');
      let savedUser = getCookie('auth_user');
      
      if (!savedToken || !savedUser) {
        // Fallback para localStorage
        savedToken = localStorage.getItem('auth_token');
        savedUser = localStorage.getItem('auth_user');
      }

      console.log('📦 Token salvo:', savedToken ? 'Sim' : 'Não');
      console.log('👤 Usuário salvo:', savedUser ? 'Sim' : 'Não');

      if (savedToken && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          console.log('👤 Dados do usuário carregados:', userData);
          
          // Verificar se o token ainda é válido antes de definir o estado
          const isValid = await verifyToken(savedToken);
          
          if (isValid) {
            setToken(savedToken);
            setUser(userData);
            console.log('✅ Sessão restaurada com sucesso');
          } else {
            console.log('❌ Token inválido, limpando sessão');
            logout();
          }
        } catch (error) {
          console.error('❌ Error parsing saved auth data:', error);
          logout();
        }
      } else {
        console.log('📭 Nenhum token encontrado, usuário não autenticado');
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, [verifyToken, logout]);

  const login = (authToken: string, userData: User) => {
    console.log('🔑 Fazendo login:', userData);
    setToken(authToken);
    setUser(userData);
    
    // Salvar em localStorage (fallback)
    localStorage.setItem('auth_token', authToken);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    
    // Salvar em cookies (mais seguro)
    setCookie('auth_token', authToken, 7); // 7 dias
    setCookie('auth_user', JSON.stringify(userData), 7);
  };

  const isAuthenticated = !!token && !!user;
  
  console.log('🔐 Estado atual:', {
    loading,
    isAuthenticated,
    hasToken: !!token,
    hasUser: !!user,
    user: user?.name
  });

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 