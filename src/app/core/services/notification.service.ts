import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();
  constructor() {}

  // Emit a success notification
  success(message: string): void {
    this.notify('success', message);
  }

  // Emit an error notification
  error(message: string): void {
    this.notify('error', message);
  }

  // Emit an info notification
  info(message: string): void {
    this.notify('info', message);
  }

  // Emit a warning notification
  warning(message: string): void {
    this.notify('warning', message);
  }

  // Emit a notification
  private notify(type: Notification['type'], message: string): void {
    this.notificationSubject.next({ type, message });
  }
}
