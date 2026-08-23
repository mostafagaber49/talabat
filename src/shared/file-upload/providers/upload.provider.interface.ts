export interface UploadProvider {
  // return url
  upload(file: Express.Multer.File, folder?: string): Promise<string>;
  delete(key: string): Promise<void>;
  get(key: string): Promise<string>;
}