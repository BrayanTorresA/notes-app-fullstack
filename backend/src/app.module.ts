import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'notes-db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    NotesModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
