import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BlogPost } from './blog-post.entity';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.blogService.createPost(dto);
  }
  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 9) {
    const [posts, total] = await this.blogService.findAll(
      Number(page),
      Number(limit),
    );
    const totalPages = Math.ceil(total / Number(limit));

    return {
      status: 'success',
      message: 'Posts fetched successfully',
      data: posts,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages,
      },
    };
  }
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<BlogPost> {
    return this.blogService.findBySlug(slug);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() dto: Partial<CreatePostDto>,
  ): Promise<BlogPost> {
    return this.blogService.update(slug, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  async remove(@Param('slug') slug: string): Promise<object> {
    const deletePost = this.blogService.remove(slug);
    if (!deletePost) {
      throw new NotFoundException(`Post with slug ${slug} not found`);
    }
    return { message: `Post with slug ${slug} deleted successfully` };
  }
}