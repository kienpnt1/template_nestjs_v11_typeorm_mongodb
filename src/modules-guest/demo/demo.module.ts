import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoEntity } from '@databases/entities';
import { DemoRepository } from '@databases/repositories';
import { GuestDemoController } from './demo.controller';
import { GuestDemoService } from './demo.service';

@Module({
  imports: [TypeOrmModule.forFeature([DemoEntity])],
  controllers: [GuestDemoController],
  providers: [GuestDemoService, DemoRepository],
})
export class GuestDemoModule {}
