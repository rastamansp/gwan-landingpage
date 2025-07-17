export interface CharacterAnalysis {
  identidade: {
    nome: string;
    idade: string;
    genero: string;
    ocupacao: string;
    personalidade: string;
    background: string;
  };
  corpo: {
    altura: string;
    peso: string;
    tipoCorporal: string;
    caracteristicas: string[];
    marcas: string[];
  };
  rosto: {
    formato: string;
    caracteristicas: string[];
    expressao: string;
    detalhes: string[];
  };
  olhos: {
    cor: string;
    formato: string;
    tamanho: string;
    caracteristicas: string[];
    expressao: string;
  };
  cabelo: {
    cor: string;
    estilo: string;
    comprimento: string;
    textura: string;
    caracteristicas: string[];
  };
  vestuario: {
    tipo: string;
    cor: string;
    estilo: string;
    detalhes: string[];
    acessorios: string[];
  };
  calcado: {
    tipo: string;
    cor: string;
    estilo: string;
    caracteristicas: string[];
  };
  acessorios: {
    tipos: string[];
    detalhes: string[];
    posicionamento: string[];
  };
  estiloFotografico: {
    iluminacao: string;
    angulo: string;
    composicao: string;
    ambiente: string;
    qualidade: string;
  };
  metadata: {
    confianca: number;
    processadoEm: string;
    versaoIA: string;
  };
}

export interface ProcessImageResponse {
  success: boolean;
  analysis?: CharacterAnalysis;
  error?: string;
  message?: string;
}
