import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService, LoginRequest } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <div class="carfo-brand">
            <img src="images/logo-carfo.png.png" alt="CARFO" class="logo" (onerror)="logoError = true">
            <div *ngIf="logoError" class="logo-fallback">C</div>
          </div>
          <h1>CARFO</h1>
          <p>Gestion des Missions</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              pInputText 
              id="email"
              formControlName="email"
              type="email"
              placeholder="Entrez votre email"
              [disabled]="loading">
            <small class="error-text" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
              Email invalide
            </small>
          </div>

          <div class="form-group">
            <label for="motDePasse">Mot de passe</label>
            <p-password 
              id="motDePasse"
              formControlName="motDePasse"
              [toggleMask]="true"
              placeholder="Entrez votre mot de passe"
              [disabled]="loading">
            </p-password>
            <small class="error-text" *ngIf="loginForm.get('motDePasse')?.invalid && loginForm.get('motDePasse')?.touched">
              Le mot de passe est requis
            </small>
          </div>

          <p-button 
            type="submit" 
            label="Se connecter"
            [loading]="loading"
            [disabled]="loginForm.invalid || loading"
            class="w-full">
          </p-button>
        </form>

        <div class="login-footer">
          <p>Utilisez un compte existant en base (email + mot de passe).</p>
          <p class="register-cta">
            Pas encore de compte ?
            <a routerLink="/register">S'inscrire</a>
          </p>
        </div>
      </div>
      <p-toast position="top-right"></p-toast>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, var(--carfo-primary) 0%, var(--carfo-secondary) 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    }

    .login-box {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 400px;
      padding: 3rem 2rem;
      animation: slideUp 0.6s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .carfo-brand {
      margin-bottom: 1rem;
      position: relative;
      width: 80px;
      height: 80px;
      margin-left: auto;
      margin-right: auto;
    }

    .logo {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .logo-fallback {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--carfo-primary), var(--carfo-secondary));
      border-radius: 50%;
      color: white;
      font-size: 2rem;
      font-weight: bold;
    }

    .login-header h1 {
      margin: 0;
      font-size: 2rem;
      color: var(--carfo-primary);
      font-weight: 700;
    }

    .login-header p {
      margin: 0.5rem 0 0 0;
      color: #888;
      font-size: 0.95rem;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
      font-size: 0.95rem;
    }

    .form-group input,
    .form-group ::ng-deep .p-password {
      padding: 0.875rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 0.95rem;
      transition: border-color 0.3s ease;
    }

    .form-group input:focus {
      outline: none;
      border-color: var(--carfo-primary);
      box-shadow: 0 0 0 3px rgba(23, 143, 61, 0.1);
    }

    .error-text {
      color: #d81f2a;
      font-size: 0.85rem;
      margin-top: 0.25rem;
    }

    .login-footer {
      text-align: center;
      padding-top: 1.5rem;
      border-top: 1px solid #eee;
      color: #666;
      font-size: 0.85rem;
      line-height: 1.6;
    }

    .login-footer strong {
      color: var(--carfo-primary);
      font-weight: 600;
    }

    .register-cta {
      margin-top: 0.75rem;
      font-size: 0.9rem;
    }

    .register-cta a {
      color: var(--carfo-primary);
      font-weight: 600;
      text-decoration: none;
      margin-left: 0.25rem;
    }

    .register-cta a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  logoError = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const credentials: LoginRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Connexion réussie' });
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
        const errorMessage = error.error?.message || 'Identifiants invalides';
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: errorMessage });
      }
    });
  }
}
