import { Injectable } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NotificationService {
  constructor(private readonly httpService: HttpService) {}

  async sendNotification(notificationDto: NotificationDto) {
    console.log('notificationDto: ', notificationDto);
    this.httpService.post(
      'https://projetao-back-url.herokuapp.com/mail-service/send-notification',
      notificationDto,
      );
  }
}
