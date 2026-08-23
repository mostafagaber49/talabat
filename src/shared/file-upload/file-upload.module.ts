import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { S3Provider } from './providers/s3.provider';

@Module({
  imports: [],
  controllers: [FileUploadController],
  providers: [S3Provider],
  exports: [S3Provider],
})
export class FileUploadModule {}