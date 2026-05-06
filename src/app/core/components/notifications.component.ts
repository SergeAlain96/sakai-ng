import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NotificationService, ErrorNotification } from '../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, ToastModule],
  template: `<p-toast></p-toast>`,
  styles: []
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private notifications = new Map<string, any>();

  constructor(
    private notificationService: NotificationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.notifications$.subscribe(
      (notification: ErrorNotification) => {
        this.displayNotification(notification);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private displayNotification(notification: ErrorNotification): void {
    const severityMap = {
      'error': 'error',
      'warning': 'warn',
      'success': 'success',
      'info': 'info'
    };

    this.messageService.add({
      severity: severityMap[notification.severity],
      summary: notification.title || 'Notification',
      detail: notification.message,
      life: notification.duration || undefined,
      key: 'app'
    });

    // Tracking for cleanup
    this.notifications.set(notification.id, notification);

    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.notifications.delete(notification.id);
      }, notification.duration);
    }
  }
}
