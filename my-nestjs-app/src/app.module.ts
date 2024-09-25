import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service/prisma.service';
import { AppController } from './app.controller';

@Module({
  providers: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}
