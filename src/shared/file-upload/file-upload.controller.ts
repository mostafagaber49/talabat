import {Controller,Post,UseInterceptors,UploadedFile,UploadedFiles,Body} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { S3Provider } from './providers/s3.provider';
import {ApiBearerAuth,ApiBody,ApiConsumes,ApiOperation,ApiTags} from '@nestjs/swagger';


@Controller('upload')
@ApiTags('File Upload')
@ApiBearerAuth('access-token')
@Controller('upload')
export class FileUploadController {
  constructor(private readonly s3Provider: S3Provider) {}

  // 1. Handler handle single image
  @Post('/image')
  @UseInterceptors(FileInterceptor('file')) // req => parse => body => file
   @ApiOperation({ summary: 'Upload single image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
      schema: {
      type: 'object',
      properties: 
      {
        file: {type: 'string',format: 'binary'},
        folder: {type: 'string',example: 'products'},
      },
    }
  })
  async uploadSingleFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder: string,
  ) {
    const url = await this.s3Provider.upload(file, folder);

    return {
      success: true,
      data: { url },
    };
  }

  // 2. Handler handle multi image
  @Post('/images')
  @Post('images')
  @ApiOperation({ summary: 'Upload multiple images' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
         files: 
         {
          type: 'array',
          items: {type: 'string',format: 'binary'},
         },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 10)) // req => parse => body => files
  async uploadMultiFile(
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // يمكنك تعديل التعامل مع مصفوفة الملفات حسب الحجم المطلوب
    const url = await this.s3Provider.upload(files[0]);

    return {
      success: true,
      data: { url },
    };
  }
}