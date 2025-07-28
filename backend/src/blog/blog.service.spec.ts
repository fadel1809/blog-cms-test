import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { BlogPost } from './blog-post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockBlogRepo = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
}
describe('BlogService', () => {
  let service: BlogService;
  let repo: Repository<BlogPost>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getRepositoryToken(BlogPost),
          useValue: mockBlogRepo,
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
    repo = module.get(getRepositoryToken(BlogPost));
  });

  afterEach(() => {
    jest.clearAllMocks(); // reset mocks tiap test
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      const dummyPosts = [{ title: 'Post 1' }, { title: 'Post 2' }];
      mockBlogRepo.find.mockResolvedValue(dummyPosts);

      const result = await service.findAll();
      expect(result).toEqual(dummyPosts);
      expect(mockBlogRepo.find).toHaveBeenCalled();
    });
  });

  describe('findBySlug', () => {
    it('should return post by slug', async () => {
      const dummyPost = { title: 'Hello', slug: 'hello' };
      mockBlogRepo.findOne.mockResolvedValue(dummyPost);

      const result = await service.findBySlug('hello');
      expect(result).toEqual(dummyPost);
      expect(mockBlogRepo.findOne).toHaveBeenCalledWith({
        where: { slug: 'hello' },
      });
    });
  });
});
  
