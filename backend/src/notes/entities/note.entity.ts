import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isArchived?: boolean;

  @ManyToOne(() => Category, (category) => category.id, {
    eager: true, // Trae la categoria al hacer un findOne
  })
  category: Category;
}
