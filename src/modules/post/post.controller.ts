import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';

@UseGuards(JwtAuthGuard)
@Controller('api/post')
@ApiTags('Posts')
@ApiBearerAuth()
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Create new post.' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiBody({ type: CreatePostDto })
  async addPost(@Body(new ValidationPipe()) createPostDto: CreatePostDto) {
    return await this.postService.createPost(createPostDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by id.' })
  @ApiOkResponse({ type: [PostEntity] })
  @ApiNotFoundResponse({ description: 'Post is not found' })
  @ApiParam({ name: 'id', description: "Post's id" })
  async getPost(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.getPostById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post by id.' })
  @ApiNotFoundResponse({ description: 'Post is not found' })
  @ApiParam({ name: 'id', description: "Post's id" })
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    await this.postService.deletePost(id);
  }
}
