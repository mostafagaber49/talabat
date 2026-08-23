import { Module, Global } from '@nestjs/common';
import { BcryptService } from './bcrybt.service';

@Global() // خيار اختياري: بيخلي الخدمة متاحة في المشرووع كله من غير ما تعمل import للموديول في كل مكان
@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}