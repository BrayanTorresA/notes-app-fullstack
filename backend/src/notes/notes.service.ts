import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const category = await this.validateCategory(createNoteDto.category);
    return await this.notesRepository.save({
      ...createNoteDto,
      category: category,
    });
  }

  async findAll() {
    return await this.notesRepository.find();
  }

  async findOne(id: number) {
    const note = await this.notesRepository.findOneBy({ id });

    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    await this.findOne(id);
    return await this.notesRepository.update(id, {
      ...updateNoteDto,
      category: updateNoteDto.category
        ? await this.validateCategory(updateNoteDto.category)
        : undefined,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.notesRepository.delete(id);
  }

  private async validateCategory(categoryId: number) {
    const categoryEntity = await this.categoryService.findOne(categoryId);

    if (!categoryEntity) {
      throw new BadRequestException('Category not found');
    }

    return categoryEntity;
  }
}
