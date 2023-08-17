import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enum/role.enum';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@Auth(Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'The records has been successfully listed.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully listed.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully deleted.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
