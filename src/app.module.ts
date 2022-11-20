import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { Post } from './modules/post/post.entity';
import { Image } from './modules/image/image.entity';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./src/config/env/${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Post, Image],
      synchronize: true,
    }),
    AuthModule,
    ImageModule,
    PostModule,
    UserModule,
  ],
})
export class AppModule {}
