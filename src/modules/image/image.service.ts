import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async addImage(image: Express.Multer.File) {
    const newImage = this.imageRepository.create();

    newImage.imageData = image.buffer;
    newImage.imageName = image.originalname;

    await this.imageRepository.save(newImage);

    return { id: newImage.id };
  }

  async getImage(id: number) {
    return this.imageRepository.findOneBy({ id });
  }

  async deleteImage(id: number) {
    const { affected } = await this.imageRepository.delete(id);

    if (!affected) {
      throw new HttpException("Can't find the image", HttpStatus.NOT_FOUND);
    }
  }
}
