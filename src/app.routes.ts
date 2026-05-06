import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { DashboardComponent } from './app/pages/dashboard/dashboard.component';
import { MissionsComponent } from './app/pages/missions/missions.component';
import { AbsencesComponent } from './app/pages/absences/absences.component';
import { DirectionsComponent } from './app/pages/directions/directions.component';
import { AgentsComponent } from './app/pages/agents/agents.component';
import { VehiculesComponent } from './app/pages/vehicules/vehicules.component';
import { LoginComponent } from './app/pages/auth/login/login.component';
import { Register } from './app/pages/auth/register';
import { authGuard, roleGuard } from './app/core/guards/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: '',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'missions', component: MissionsComponent },
            { path: 'missions/nouvelle', component: MissionsComponent },
            {
                path: 'agents',
                component: AgentsComponent,
                canActivate: [roleGuard(['ADMINISTRATEUR', 'CHARGE_ETUDE'])]
            },
            { path: 'vehicules', component: VehiculesComponent },
            { path: 'absences', component: AbsencesComponent },
            {
                path: 'directions',
                component: DirectionsComponent,
                canActivate: [roleGuard(['ADMINISTRATEUR'])]
            }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
