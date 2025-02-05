import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { Product } from './product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый продукт' })
  @ApiResponse({
    status: 201,
    description: 'Продукт успешно создан',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все продукты с пагинацией' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({
    status: 200,
    description: 'Список продуктов с метаданными',
    schema: {
      example: {
        data: [
          {
            id: 'uuid',
            name: 'Название',
            price: 100,
            createdAt: '2024-01-01',
          },
        ],
        count: 1,
      },
    },
  })
  findAll(@Query() query: ProductQueryDto) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить продукт по ID' })
  @ApiParam({ name: 'id', description: 'UUID продукта' })
  @ApiResponse({ status: 200, description: 'Продукт найден', type: Product })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить продукт' })
  @ApiParam({ name: 'id', description: 'UUID продукта' })
  @ApiResponse({ status: 200, description: 'Продукт обновлён', type: Product })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить продукт' })
  @ApiParam({ name: 'id', description: 'UUID продукта' })
  @ApiResponse({ status: 200, description: 'Продукт удалён' })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
