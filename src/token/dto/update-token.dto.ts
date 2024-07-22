import { PartialType } from '@nestjs/mapped-types';
import { RefreshTokenDto } from './create-token.dto';

export class UpdateTokenDto extends PartialType(RefreshTokenDto) {}
