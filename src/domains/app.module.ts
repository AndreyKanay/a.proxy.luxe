import { Module } from '@nestjs/common';
import { UsersModule } from './v1/users/users.module';
import { AuthModule } from './v1/auth/auth.module';
import { ProductModule } from './v1/product/product.module';
import { User } from './v1/users/users.entity';
import { Product } from './v1/product/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './v1/order/order.module';
import { CategoryModule } from './v1/articles/category/category.module';
import { ArticleModule } from './v1/articles/article/article.module';
import { ServicesModule } from './v1/services/services.module';
import { Order } from './v1/order/order.entity';
import { Category } from './v1/articles/category/category.entity';
import { Article } from './v1/articles/article/article.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product, Order, Category, Article], // Все сущности
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    ProductModule,
    UsersModule,
    AuthModule,
    ProductModule,
    OrderModule,
    CategoryModule,
    ArticleModule,
    ServicesModule,
  ],
})
export class AppModule {}
