import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoEntity } from '@databases/entities';
import { DemoRepository } from '@databases/repositories';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

@Module({
  imports: [TypeOrmModule.forFeature([DemoEntity])],
  controllers: [DemoController],
  providers: [DemoService, DemoRepository],
  exports: [DemoService],
})
export class AdminDemoModule {}
