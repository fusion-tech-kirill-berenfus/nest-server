import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageService } from '../image/image.service';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UserService,
    private imageService: ImageService,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    const { title, content, authorId, imageId } = createPostDto;

    const user = await this.userService.getUserById(authorId);
    if (!user) {
      throw new HttpException(
        'Invalid authorId. User was not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    const post = this.postRepository.create({ title, content });
    post.author = user;

    if (imageId) {
      const image = await this.imageService.getImage(imageId);
      post.image = image;
    }

    await this.postRepository.save(post);

    return post;
  }

  getPostById(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async deletePost(id: number) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new HttpException("Can't find the post", HttpStatus.NOT_FOUND);
    }

    await this.postRepository.remove(post);
  }
}
