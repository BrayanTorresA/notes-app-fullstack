import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create({ name }: CreateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ name });

    if (category) {
      throw new BadRequestException('Category already exists');
    }

    return this.categoryRepository.save({
      name,
    });
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);

    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.categoryRepository.delete(id);
  }
}
