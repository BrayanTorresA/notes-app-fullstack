import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
