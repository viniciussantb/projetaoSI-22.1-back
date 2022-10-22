import { Injectable } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificationService {
  constructor(private readonly httpService: HttpService) {}

  async sendNotification(notificationDto: NotificationDto) {
    const payload = {
      "NotificationDto": notificationDto
    }
    const res = firstValueFrom(this.httpService.post(
      'https://projetao-back-url.herokuapp.com/mail-service/send-notification/',
      JSON.stringify(payload),
      { headers: { 'Content-Type': 'application/json' }, }
      )).then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}
