import { Note } from 'src/notes/entities/note.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false }) //unique:true
  name: string;

  @OneToMany(() => Note, (note) => note.category)
  notes: Note[];
}
