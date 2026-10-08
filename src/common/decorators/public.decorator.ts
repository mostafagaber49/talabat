import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'is_public';

export const ispublic = () => SetMetadata(IS_PUBLIC, true);