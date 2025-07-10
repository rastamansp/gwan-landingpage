export interface IFileUploadService {
  uploadImage(file: any): Promise<string>;
  deleteImage(imageUrl: string): Promise<void>;
}
