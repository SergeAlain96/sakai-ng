import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  private handleError(error: HttpErrorResponse): void {
    let errorMessage = 'Une erreur inattendue est survenue';
    let errorTitle = 'Erreur';

    // Handle backend error response
    if (error.error) {
      if (typeof error.error === 'object') {
        errorMessage = error.error.message || errorMessage;
        errorTitle = error.error.title || errorTitle;
      } else if (typeof error.error === 'string') {
        errorMessage = error.error;
      }
    }

    // Override based on HTTP status
    if (error.status === 0) {
      errorMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion.';
      errorTitle = 'Erreur de connexion';
    } else if (error.status === 401) {
      errorMessage = 'Votre session a expiré. Veuillez vous reconnecter.';
      errorTitle = 'Non authentifié';
      // Could redirect to login here
    } else if (error.status === 403) {
      errorMessage = 'Vous n\'avez pas les permissions pour effectuer cette action.';
      errorTitle = 'Accès refusé';
    } else if (error.status === 404) {
      errorMessage = 'La ressource demandée n\'existe pas.';
      errorTitle = 'Non trouvé';
    } else if (error.status === 409) {
      errorMessage = errorMessage || 'Conflit détecté. La ressource existe peut-être déjà.';
      errorTitle = errorTitle || 'Conflit';
    } else if (error.status === 400) {
      errorMessage = errorMessage || 'Requête invalide. Vérifiez les données soumises.';
      errorTitle = errorTitle || 'Requête invalide';
    } else if (error.status === 500) {
      errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
      errorTitle = 'Erreur serveur';
    }

    this.notificationService.showError(errorMessage, errorTitle);
  }
}
