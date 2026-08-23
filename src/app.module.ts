import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheConfigService } from './shared/cache/cache.config.service';
import { AuthModule } from './modules/auth/auth.module';
import { BcryptModule } from './shared/bcrybt/bcrybt.module';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { OrederModule } from './modules/order/order.module';
import { JwtModule } from '@nestjs/jwt';
import { FileUploadModule } from './shared/file-upload/file-upload.module';
import { mailModule } from './shared/mailer/mail.module';
@Module({
  imports: [ConfigModule.forRoot({

    isGlobal: true , load :[configuration]

  }),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService)=>({

      secret: configService.get('jwt').accessSecret,
      signOptions: {expiresIn : '1d'}
    })
  }),
  CacheModule.registerAsync({

    isGlobal: true,
    inject: [ConfigService],
    useClass: CacheConfigService
  }),
  MongooseModule.forRootAsync({
  inject: [ConfigService],
  useFactory : (configService : ConfigService) => ({

    uri : configService.get('database').url ,
    onConnectionCreate: (connection: Connection) => {
    connection.on('connected', () => console.log('DB connected'));
    connection.on('open', () => console.log('DB open'));
    connection.on('disconnected', () => console.log('DB disconnected'));
    connection.on('reconnected', () => console.log('DB reconnected'));
    connection.on('disconnecting', () => console.log('DB disconnecting'));

    return connection; }
  })
  }),
  AuthModule,
  BcryptModule,
  ProductModule,
  BrandModule,
  CategoryModule,
  OrederModule,
  FileUploadModule,
  mailModule,

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
