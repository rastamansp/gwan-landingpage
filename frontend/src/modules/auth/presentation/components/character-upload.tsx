import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  TextField,
  AppBar,
  Toolbar,
} from '@mui/material';
import { CloudUpload, Edit, Save, Logout } from '@mui/icons-material';
import { useAuth } from '../../infrastructure/context/auth-context';
import { AuthApiService } from '../../infrastructure/services/auth-api.service';
import { ProcessCharacterImageUseCase } from '../../application/use-cases/process-character-image.use-case';

// Configuração da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Debug: Log da URL base
console.log('🔍 DEBUG character-upload - API_BASE_URL:', API_BASE_URL);
console.log('🔍 DEBUG character-upload - REACT_APP_API_URL env:', process.env.REACT_APP_API_URL);

interface CharacterUploadProps {
  onUploadSuccess?: (imageUrl: string) => void;
}

export const CharacterUpload: React.FC<CharacterUploadProps> = ({ onUploadSuccess }) => {
  const { user, token, logout } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [processedData, setProcessedData] = useState<any>(null);
  const [editableAnalysis, setEditableAnalysis] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loadingCurrentImage, setLoadingCurrentImage] = useState(true);

  useEffect(() => {
    const loadCurrentImage = async () => {
      if (!token) return;

      try {
        const authApiService = new AuthApiService();
        const response = await authApiService.getUserImage(token);
        
        if (response.success && response.imageUrl) {
          setUploadedImageUrl(response.imageUrl);
          setPreviewUrl(response.imageUrl);
        }
      } catch (error) {
        console.log('Nenhuma imagem atual encontrada');
      } finally {
        setLoadingCurrentImage(false);
      }
    };

    loadCurrentImage();
  }, [token]);

  const handleLogout = () => {
    logout();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !token) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const uploadUrl = `${API_BASE_URL}/upload`;
      console.log('🔍 DEBUG character-upload - Upload URL:', uploadUrl);

      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadedImageUrl(result.imageUrl);
        setPreviewUrl(result.imageUrl);
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
    setProcessedData(null);
    setEditableAnalysis('');
    setIsEditing(false);
  };

  const handleProcessImage = async () => {
    if (!token) return;

    setProcessing(true);
    setError(null);

    try {
      const authApiService = new AuthApiService();
      const processCharacterImageUseCase = new ProcessCharacterImageUseCase(authApiService);
      
      const result = await processCharacterImageUseCase.execute({ token });

      if (result.success) {
        setProcessedData(result.processedData);
        // Converter análise para JSON formatado
        const formattedAnalysis = JSON.stringify(result.processedData?.analysis || {}, null, 2);
        setEditableAnalysis(formattedAnalysis);
        setSuccess(true);
      } else {
        setError(result.error || 'Erro ao processar imagem');
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setProcessing(false);
    }
  };

  const handleEditAnalysis = () => {
    setIsEditing(true);
  };

  const handleSaveAnalysis = () => {
    try {
      // Validar se é JSON válido
      JSON.parse(editableAnalysis);
      setIsEditing(false);
      setSuccess(true);
    } catch (error) {
      setError('JSON inválido. Verifique a formatação.');
    }
  };

  const formatAnalysisForDisplay = (analysis: any) => {
    if (!analysis) return '';
    const sections: string[] = [];

    if (analysis.identidade) {
      sections.push('=== IDENTIDADE ===');
      Object.entries(analysis.identidade).forEach(([key, value]) => {
        sections.push(`${key}: ${value || 'Não definido'}`);
      });
    }
    
    if (analysis.corpo) {
      sections.push('\n=== CORPO ===');
      Object.entries(analysis.corpo).forEach(([key, value]) => {
        sections.push(`${key}: ${value || 'Não definido'}`);
      });
    }
    
    if (analysis.rosto) {
      sections.push('\n=== ROSTO ===');
      Object.entries(analysis.rosto).forEach(([key, value]) => {
        sections.push(`${key}: ${value || 'Não definido'}`);
      });
    }
    
    if (analysis.olhos) {
      sections.push('\n=== OLHOS ===');
      Object.entries(analysis.olhos).forEach(([key, value]) => {
        sections.push(`${key}: ${value || 'Não definido'}`);
      });
    }
    
    if (analysis.cabelo) {
      sections.push('\n=== CABELO ===');
      Object.entries(analysis.cabelo).forEach(([key, value]) => {
        sections.push(`${key}: ${value || 'Não definido'}`);
      });
    }
    
    if (analysis.vestuario) {
      sections.push('\n=== VESTUÁRIO ===');
      Object.entries(analysis.vestuario).forEach(([key, value]) => {
        sections.push(`${key}: ${value || 'Não definido'}`);
      });
    }
    
    if (analysis.calcado) {
      sections.push('\n=== CALÇADO ===');
      Object.entries(analysis.calcado).forEach(([key, value]) => {
        sections.push(`${key}: ${value || 'Não definido'}`);
      });
    }
    
    if (analysis.acessorios) {
      sections.push('\n=== ACESSÓRIOS ===');
      Object.entries(analysis.acessorios).forEach(([key, value]) => {
        sections.push(`${key}: ${value || 'Não definido'}`);
      });
    }
    
    if (analysis.estiloFotografico) {
      sections.push('\n=== ESTILO FOTOGRÁFICO ===');
      Object.entries(analysis.estiloFotografico).forEach(([key, value]) => {
        sections.push(`${key}: ${value || 'Não definido'}`);
      });
    }
    
    return sections.join('\n');
  };

  if (loadingCurrentImage) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

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

      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
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
            Operação realizada com sucesso!
          </Alert>
        )}

        {uploadedImageUrl && (
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Imagem do Personagem
              </Typography>
              <img
                src={uploadedImageUrl}
                alt="Personagem"
                style={{
                  maxWidth: '100%',
                  maxHeight: 200,
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                URL: {uploadedImageUrl}
              </Typography>
              
              <Button
                variant="contained"
                color="secondary"
                onClick={handleProcessImage}
                disabled={processing}
                startIcon={processing ? <CircularProgress size={20} /> : null}
                sx={{ mt: 2 }}
              >
                {processing ? 'Processando...' : 'Processar Imagem'}
              </Button>
            </Box>
          </Paper>
        )}

        {processedData && (
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Análise do Personagem
                </Typography>
                <Box>
                  {!isEditing ? (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleEditAnalysis}
                      startIcon={<Edit />}
                    >
                      Editar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleSaveAnalysis}
                      startIcon={<Save />}
                    >
                      Salvar
                    </Button>
                  )}
                </Box>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Processado em: {processedData.processedAt || new Date().toLocaleString()}
              </Typography>
              
              {/* Removed Divider as it's not in the new_code */}
              
              {isEditing ? (
                <TextField
                  fullWidth
                  multiline
                  rows={20}
                  value={editableAnalysis}
                  onChange={(e) => setEditableAnalysis(e.target.value)}
                  variant="outlined"
                  sx={{ fontFamily: 'monospace' }}
                  helperText="Edite as informações do personagem. Use 'Não definido' para campos vazios."
                />
              ) : (
                <Box sx={{ 
                  bgcolor: 'grey.50', 
                  p: 2, 
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  whiteSpace: 'pre-wrap',
                  maxHeight: 400,
                  overflow: 'auto'
                }}>
                  {formatAnalysisForDisplay(processedData.analysis)}
                </Box>
              )}
            </Box>
          </Paper>
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
                    startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
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