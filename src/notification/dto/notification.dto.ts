class MarketProductNotificationDto {
  marketName!: string;

  productName!: string;

  price!: number;

  quantity!: number;
}

class UserDataDto {
  email!: string;

  name!: string;
}

export class NotificationDto {
  category!: string;

  isMarket!: boolean;

  userData!: UserDataDto[];

  marketProduct?: MarketProductNotificationDto;
}
