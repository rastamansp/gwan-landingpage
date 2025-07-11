import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
} from '@mui/material';
import { CloudUpload, CheckCircle, Logout } from '@mui/icons-material';
import { useAuth } from '../../infrastructure/context/auth-context';
import { useNavigate } from 'react-router-dom';

interface CharacterUploadProps {
  onUploadSuccess?: (imageUrl: string) => void;
}

export const CharacterUpload: React.FC<CharacterUploadProps> = ({ onUploadSuccess }) => {
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    // Validar tamanho (20MB)
    if (file.size > 20 * 1024 * 1024) {
      setError('Arquivo muito grande. Tamanho máximo: 20MB');
      return;
    }

    setSelectedFile(file);
    setError(null);

    // Criar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !token) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadedImageUrl(result.imageUrl);
        setSuccess(true);
        onUploadSuccess?.(result.imageUrl);
      } else {
        setError(result.error || 'Erro ao fazer upload');
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadedImageUrl(null);
    setError(null);
    setSuccess(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header com botão de logout */}
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gwan - Upload de Personagem
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="inherit">
              Olá, {user?.name}!
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<Logout />}
              sx={{ 
                border: '1px solid rgba(255,255,255,0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Sair
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Upload do Personagem
        </Typography>
        
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Faça upload da imagem do seu personagem. Você pode atualizar a imagem a qualquer momento.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Imagem enviada com sucesso!
          </Alert>
        )}

        {uploadedImageUrl && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Imagem do Personagem
              </Typography>
              <CardMedia
                component="img"
                image={uploadedImageUrl}
                alt="Personagem"
                sx={{ 
                  height: 200, 
                  objectFit: 'cover',
                  borderRadius: 1,
                  mb: 2
                }}
              />
              <Typography variant="body2" color="text.secondary">
                URL: {uploadedImageUrl}
              </Typography>
            </CardContent>
          </Card>
        )}

        <Paper sx={{ p: 3, textAlign: 'center' }}>
          {!uploadedImageUrl ? (
            <>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleFileSelect}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUpload />}
                  sx={{ mb: 2 }}
                >
                  Selecionar Imagem
                </Button>
              </label>

              {previewUrl && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Preview
                  </Typography>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: 200,
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {selectedFile?.name} ({(selectedFile?.size || 0 / 1024 / 1024).toFixed(2)} MB)
                  </Typography>
                </Box>
              )}

              {selectedFile && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleUpload}
                    disabled={uploading}
                    startIcon={uploading ? <CircularProgress size={20} /> : <CheckCircle />}
                    sx={{ mr: 1 }}
                  >
                    {uploading ? 'Enviando...' : 'Enviar Imagem'}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    disabled={uploading}
                  >
                    Cancelar
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<CloudUpload />}
            >
              Fazer Novo Upload
            </Button>
          )}
        </Paper>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Formatos aceitos: JPG, JPEG, PNG, GIF
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tamanho máximo: 20MB
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}; 