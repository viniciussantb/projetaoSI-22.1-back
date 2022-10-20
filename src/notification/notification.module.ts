import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  exports: [NotificationService],
  imports: [HttpModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
