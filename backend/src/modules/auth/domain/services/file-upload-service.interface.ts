export interface IFileUploadService {
  uploadImage(file: any, userId?: string): Promise<string>;
  deleteImage(imageUrl: string): Promise<void>;
}
