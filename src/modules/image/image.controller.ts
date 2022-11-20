import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ImageValidationPipe } from 'src/pipes/image-validator.pipe';
import { ImageService } from './image.service';

@Controller('api/image')
@ApiTags('Image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Create new image.' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(
    @UploadedFile(ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return await this.imageService.addImage(image);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete image by id.' })
  @ApiNotFoundResponse({ description: 'Image not found' })
  @ApiParam({ name: 'id', description: "Image's id" })
  async deleteImage(@Param('id', ParseIntPipe) id: number) {
    await this.imageService.deleteImage(id);
  }
}
