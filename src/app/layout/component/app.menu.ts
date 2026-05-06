import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        @for (item of model; track item.label) {
            @if (!item.separator) {
                <li app-menuitem [item]="item" [root]="true"></li>
            } @else {
                <li class="menu-separator"></li>
            }
        }
    </ul> `,
})
export class AppMenu implements OnInit {
    model: MenuItem[] = [];

    constructor(private readonly authService: AuthService) {}

    ngOnInit() {
        const userRoles = this.authService.getCurrentUser()?.roles || [];
        const isAdmin = userRoles.includes('ADMINISTRATEUR');
        const isChargéÉtude = userRoles.includes('CHARGE_ETUDE');

        this.model = [
            {
                label: 'Missions',
                items: [
                    {
                        label: 'Tableau de bord mission',
                        icon: 'pi pi-home',
                        routerLink: ['/dashboard']
                    },
                    {
                        label: 'Liste des missions',
                        icon: 'pi pi-list',
                        routerLink: ['/missions']
                    },
                    {
                        label: 'Nouvelle mission',
                        icon: 'pi pi-plus',
                        routerLink: ['/missions/nouvelle']
                    }
                ]
            },
            {
                label: 'Ressources',
                items: [
                    {
                        label: 'Agents',
                        icon: 'pi pi-users',
                        routerLink: ['/agents'],
                        visible: isAdmin || isChargéÉtude
                    },
                    {
                        label: 'Véhicules',
                        icon: 'pi pi-car',
                        routerLink: ['/vehicules']
                    },
                    {
                        label: 'Absences',
                        icon: 'pi pi-calendar-times',
                        routerLink: ['/absences'],
                        visible: isAdmin || isChargéÉtude
                    },
                    {
                        label: 'Directions',
                        icon: 'pi pi-sitemap',
                        routerLink: ['/directions'],
                        visible: isAdmin
                    }
                ]
            }
        ];
    }
}

