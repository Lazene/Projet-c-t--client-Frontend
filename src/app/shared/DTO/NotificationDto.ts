export interface NotificationDto {
    notificationId: number;
    title: string;
    description: string;
    createdDate: Date;
    userId: number;
    userName?: string;
  }