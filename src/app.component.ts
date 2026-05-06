import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from './app/core/components/notifications.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, NotificationsComponent],
    template: `
      <app-notifications></app-notifications>
      <router-outlet></router-outlet>
    `
})
export class AppComponent {}
