import { ProcessImageResponse } from '../types/character-analysis.types';

export interface IExternalApiService {
  processImage(imageUrl: string): Promise<ProcessImageResponse>;
}
