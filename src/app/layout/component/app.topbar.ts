import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from '@/app/layout/service/layout.service';
import { AuthService } from '@/app/core/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, ButtonModule, MenuModule, RippleModule],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-left">
            <button class="layout-menu-button layout-topbar-action" type="button" aria-label="Ouvrir le menu" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>

            <a class="layout-topbar-logo" routerLink="/dashboard">
                <span class="brand-logo-shell">
                    <img
                        [src]="logoUrl"
                        alt="Logo CARFO"
                        class="carfo-brand-logo"
                        [style.display]="logoLoaded ? 'block' : 'none'"
                        (load)="logoLoaded = true"
                        (error)="logoLoaded = false"
                    />
                    <span class="carfo-brand-mark" [style.display]="logoLoaded ? 'none' : 'grid'">C</span>
                </span>

                <span class="brand-copy">
                    <span class="brand-kicker">CARFO</span>
                    <span class="brand-title">Gestion des missions</span>
                </span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <span class="session-pill">
                <i class="pi pi-shield"></i>
                <span>{{ authLabel }}</span>
            </span>

            <div class="user-menu">
                <div class="user-summary">
                    <span class="user-avatar">{{ userInitials }}</span>
                    <span class="user-meta">
                        <span class="user-name">{{ displayName }}</span>
                        <span class="user-role">{{ displayRole }}</span>
                    </span>
                </div>

                <p-button
                    icon="pi pi-ellipsis-v"
                    [rounded]="true"
                    [text]="true"
                    severity="secondary"
                    (click)="op.toggle($event)"
                    pRipple>
                </p-button>
                <p-menu #op [model]="userMenuItems" [popup]="true"></p-menu>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    layoutService = inject(LayoutService);
    authService = inject(AuthService);
    router = inject(Router);
    
    logoUrl = 'images/logo-carfo.png.png';
    logoLoaded = false;
    currentUser: any = null;
    userMenuItems: MenuItem[] = [];
    authLabel = 'Session active';
    displayName = 'Invité';
    displayRole = 'Accès démo';
    userInitials = 'G';

    constructor() {
        this.currentUser = this.authService.getCurrentUser();
        this.displayName = this.currentUser?.username || 'Invité';
        this.displayRole = this.currentUser?.roles?.[0] || 'Accès démo';
        this.userInitials = this.getInitials(this.displayName);
        this.userMenuItems = [
            {
                label: 'Profil',
                icon: 'pi pi-user-edit',
                command: () => this.goToProfile()
            },
            {
                separator: true
            },
            {
                label: 'Déconnexion',
                icon: 'pi pi-sign-out',
                command: () => this.logout(),
                styleClass: 'text-red-500'
            }
        ];
    }

    goToProfile(): void {
        this.router.navigate(['/profile']);
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    private getInitials(name: string): string {
        const cleaned = (name || '').trim();
        if (!cleaned) {
            return 'G';
        }

        const parts = cleaned.split(/\s+/).filter(Boolean);
        return parts.slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join('');
    }
}
