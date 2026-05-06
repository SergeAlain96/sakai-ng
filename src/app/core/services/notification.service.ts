import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ErrorNotification {
  id: string;
  message: string;
  title?: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  timestamp: Date;
  duration?: number; // ms, 0 = sticky
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new Subject<ErrorNotification>();
  public notifications$ = this.notificationsSubject.asObservable();

  private notificationIdCounter = 0;

  showError(message: string, title: string = 'Erreur', duration: number = 5000): void {
    this.show(message, 'error', title, duration);
  }

  showSuccess(message: string, title: string = 'Succès', duration: number = 3000): void {
    this.show(message, 'success', title, duration);
  }

  showWarning(message: string, title: string = 'Attention', duration: number = 4000): void {
    this.show(message, 'warning', title, duration);
  }

  showInfo(message: string, title: string = 'Information', duration: number = 3000): void {
    this.show(message, 'info', title, duration);
  }

  private show(message: string, severity: 'error' | 'warning' | 'info' | 'success', title: string, duration: number): void {
    const notification: ErrorNotification = {
      id: `notif-${++this.notificationIdCounter}`,
      message,
      title,
      severity,
      timestamp: new Date(),
      duration: duration > 0 ? duration : 0
    };

    this.notificationsSubject.next(notification);

    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, duration);
    }
  }

  removeNotification(id: string): void {
    // Implementer la suppression côté composant qui reçoit le Subject
  }

  /**
   * Extraire et afficher les messages d'erreur d'une HttpErrorResponse
   */
  handleError(error: any): void {
    if (error.error && error.error.message) {
      this.showError(error.error.message, error.error.title || 'Erreur');
    } else if (error.message) {
      this.showError(error.message, 'Erreur');
    } else {
      this.showError('Une erreur inattendue est survenue', 'Erreur');
    }
  }
}
