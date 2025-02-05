import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsInt, IsString } from 'class-validator';

export class ProductQueryDto {
  @ApiProperty({
    required: false,
    description: 'Количество элементов на странице',
  })
  @IsOptional()
  @IsPositive()
  @IsInt()
  limit?: number;

  @ApiProperty({
    required: false,
    description: 'Смещение элементов',
  })
  @IsOptional()
  @IsInt()
  offset?: number;

  @ApiProperty({
    required: false,
    description: 'Поиск по названию',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
