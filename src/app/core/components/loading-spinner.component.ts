import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host ::ng-deep {
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(4px);
        animation: fadeIn 0.3s ease-in-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .spinner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
      }

      .spinner {
        width: 60px;
        height: 60px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .spinner-text {
        color: white;
        font-size: 1rem;
        font-weight: 500;
      }

      .loading-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        animation: slideProgress 2s ease-in-out infinite;
        z-index: 10000;
      }

      @keyframes slideProgress {
        0% {
          width: 0;
        }
        50% {
          width: 100%;
        }
        100% {
          width: 100%;
        }
      }
    }
  `],
  template: `
    <div *ngIf="isLoading" class="loading-overlay">
      <div class="loading-bar"></div>
      <div class="spinner-container">
        <div class="spinner"></div>
        <div class="spinner-text">{{ message }}</div>
      </div>
    </div>
  `
})
export class LoadingSpinnerComponent {
  @Input() isLoading = false;
  @Input() message = 'Chargement en cours...';
}
