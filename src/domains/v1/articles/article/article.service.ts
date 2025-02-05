import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const category = await this.categoryService.findOne(
      createArticleDto.category_id,
    );
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const article = this.articleRepository.create({
      ...createArticleDto,
      category,
    });

    return this.articleRepository.save(article);
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find({ relations: ['category'] });
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.findOne(id);
    const category = updateArticleDto.category_id
      ? await this.categoryService.findOne(updateArticleDto.category_id)
      : article.category;

    return this.articleRepository.save({
      ...article,
      ...updateArticleDto,
      category,
    });
  }

  async remove(id: string): Promise<void> {
    await this.articleRepository.delete(id);
  }
}
