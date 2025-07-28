import { Entity,Column, PrimaryGeneratedColumn,CreateDateColumn } from "typeorm";

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;
  
  @Column({unique:true})
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  publishedAt: Date;
}