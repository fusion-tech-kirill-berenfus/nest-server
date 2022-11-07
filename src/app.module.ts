import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./src/config/env/${process.env.NODE_ENV}.env`,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
