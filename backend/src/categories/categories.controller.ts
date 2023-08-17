import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enum/role.enum';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('categories')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@Auth(Role.ADMIN)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'The records has been successfully listed.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully listed.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully deleted.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }
}
