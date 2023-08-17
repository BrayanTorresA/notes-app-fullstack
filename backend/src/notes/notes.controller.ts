import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enum/role.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('notes')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@Auth(Role.USER)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(
    @Body() createNoteDto: CreateNoteDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.notesService.create(createNoteDto, user);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'The records has been successfully listed.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findAll(@ActiveUser() user: ActiveUserInterface) {
    return this.notesService.findAll(user);
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully listed.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findOne(@Param('id') id: number, @ActiveUser() user: ActiveUserInterface) {
    return this.notesService.findOne(id, user);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  update(
    @Param('id') id: number,
    @Body() updateNoteDto: UpdateNoteDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.notesService.update(id, updateNoteDto, user);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully deleted.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  remove(@Param('id') id: number, @ActiveUser() user: ActiveUserInterface) {
    return this.notesService.remove(id, user);
  }
}
