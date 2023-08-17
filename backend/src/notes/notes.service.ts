import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { Role } from 'src/common/enum/role.enum';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createNoteDto: CreateNoteDto, user: ActiveUserInterface) {
    const category = await this.validateCategory(createNoteDto.category);
    return await this.notesRepository.save({
      ...createNoteDto,
      category: category,
      userId: user.id,
    });
  }

  async findAll(user: ActiveUserInterface) {
    if (user.role === Role.ADMIN) {
      return await this.notesRepository.find();
    }
    return await this.notesRepository.find({
      where: {
        userId: user.id,
      },
    });
  }

  async findOne(id: number, user: ActiveUserInterface) {
    const note = await this.notesRepository.findOneBy({ id });

    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    this.validateOwnership(note, user);
    return note;
  }

  async update(
    id: number,
    updateNoteDto: UpdateNoteDto,
    user: ActiveUserInterface,
  ) {
    await this.findOne(id, user);
    return await this.notesRepository.update(id, {
      ...updateNoteDto,
      category: updateNoteDto.category
        ? await this.validateCategory(updateNoteDto.category)
        : undefined,
      userId: user.id,
    });
  }

  async remove(id: number, user: ActiveUserInterface) {
    await this.findOne(id, user);

    return await this.notesRepository.delete(id);
  }

  private async validateCategory(categoryId: number) {
    const categoryEntity = await this.categoryService.findOne(categoryId);

    if (!categoryEntity) {
      throw new BadRequestException('Category not found');
    }

    return categoryEntity;
  }

  private validateOwnership(note: Note, user: ActiveUserInterface) {
    if (user.role !== Role.ADMIN && note.userId !== user.id) {
      throw new UnauthorizedException();
    }
  }
}
