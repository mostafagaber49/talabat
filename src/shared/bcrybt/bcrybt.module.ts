import { Module, Global } from '@nestjs/common';
import { BcryptService } from './bcrybt.service';

@Global()
@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}