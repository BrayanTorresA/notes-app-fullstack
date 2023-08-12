import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
