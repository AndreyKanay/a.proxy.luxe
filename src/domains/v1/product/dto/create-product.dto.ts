import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    example: 'IPv4 ПРОКСИ для соц. сетей',
    description: 'Название товара (макс. 255 символов)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example:
      'Подходят для сайтов с поддержкой IPv6. Instagram, Facebook, YouTube, Google, Yandex. Поиск ',
    description: 'Описание товара',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 29999.99,
    description: 'Цена товара (положительное число)',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  price: number;
}
