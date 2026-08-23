import { Injectable } from '@nestjs/common';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { UploadProvider } from './upload.provider.interface';

@Injectable()
export class S3Provider implements UploadProvider {
  private readonly client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new S3Client({
      region: this.configService.get('s3').region,
      endpoint: this.configService.get('s3.endpoint'),
      credentials: {
        accessKeyId: this.configService.get('s3').accessKeyId,
        secretAccessKey: this.configService.get('s3').secretAccessKey,
      },
      forcePathStyle: true,
    });
  }
async upload(
    file: Express.Multer.File,
    folder: string = 'public',
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.configService.get('s3').bucketName,
      Body: file.buffer,
      Key: `${folder}/${Date.now()}_${file.originalname}`,
      ContentType: file.mimetype && file.mimetype !== 'application/octet-stream' 
      ? file.mimetype 
      : 'image/jpeg',
    });

    await this.client.send(command);

    return command.input.Key as string;
  }


async delete(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Key: key,
      Bucket: this.configService.get('s3').bucketName,
    });

    await this.client.send(command);
  }


    get(key: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  }