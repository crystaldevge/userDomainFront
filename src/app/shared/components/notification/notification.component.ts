import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/interfaces/notification.interface';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notify: NotificationService) {}

  ngOnInit(): void {
    // Subscribe to notifications
    this.notify.notifications$.subscribe((notification) => {
      this.notifications.push(notification);

      // Automatically remove the notification after 3 seconds
      setTimeout(() => {
        this.notifications.shift();
      }, 4000);
    });
  }

  // Remove a notification manually
  removeNotification(index: number): void {
    this.notifications.splice(index, 1);
  }
}
