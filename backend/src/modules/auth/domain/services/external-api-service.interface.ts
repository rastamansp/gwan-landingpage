export interface IExternalApiService {
  processImage(imageUrl: string): Promise<any>;
}
