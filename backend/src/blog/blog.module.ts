import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogPost } from './blog-post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule {}
