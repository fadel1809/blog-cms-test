import { Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPost } from './blog-post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { slugify } from 'src/utils/slugify';
@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private blogRepo: Repository<BlogPost>,
  ) {}
  async createPost(dto: CreatePostDto): Promise<BlogPost> {
    let baseSlug = slugify(dto.title);
    let slug = baseSlug;
    let count = 1;

    while (await this.blogRepo.findOne({ where: { slug } })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    const post = this.blogRepo.create({
      title: dto.title,
      content: dto.content,
      slug,
      publishedAt: new Date(),
    });

    return this.blogRepo.save(post);
  }

  async findAll(page = 1, limit = 10): Promise<[BlogPost[], number]> {
    const [posts, total] = await this.blogRepo.findAndCount({
      order: { publishedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return [posts, total];
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const post = await this.blogRepo.findOne({ where: { slug } });
    if (!post) throw new NotFoundException(`Post with slug ${slug} not found`);
    return post;
  }
  async update(slug: string, dto: Partial<CreatePostDto>): Promise<BlogPost> {
    const post = await this.blogRepo.findOne({ where: { slug } });
    if (!post) throw new NotFoundException(`Post with slug ${slug} not found`);
    if (dto.title && dto.title !== post.title) {
      let baseSlug = slugify(dto.title);
      let slug = baseSlug;
      let count = 1;

      while (await this.blogRepo.findOne({ where: { slug } })) {
        slug = `${baseSlug}-${count}`;
        count++;
      }
      post.slug = slug;
    }
    this.blogRepo.merge(post, dto);
    return this.blogRepo.save(post);
  }
  async remove(slug: string): Promise<void> {
    const result = await this.blogRepo.delete({ slug });
    if (result.affected === 0) {
      throw new NotFoundException(`Post with id ${slug} not found`);
    }
  }
}

