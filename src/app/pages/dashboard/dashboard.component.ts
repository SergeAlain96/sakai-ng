import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { firstValueFrom } from 'rxjs';
import { DashboardService, DashboardStats, UpcomingMissions } from '../../core/services/dashboard.service';
import { LoadingSpinnerComponent } from '../../core/components/loading-spinner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule, ChartModule, ToastModule, LoadingSpinnerComponent],
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  stats: DashboardStats | null = null;
  upcomingMissions: UpcomingMissions | null = null;

  // Charts
  missionStatusChart: any;
  directionsChart: any;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;

    Promise.all([
      firstValueFrom(this.dashboardService.getAnnualStats()),
      firstValueFrom(this.dashboardService.getUpcomingMissions())
    ])
      .then(([stats, missions]) => {
        this.stats = stats || null;
        this.upcomingMissions = missions || null;
        this.initCharts();
      })
      .catch(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger le tableau de bord'
        });
      })
      .finally(() => {
        this.loading = false;
      });
  }

  initCharts(): void {
    if (!this.stats) return;

    // Chart: Missions par statut
    this.missionStatusChart = {
      labels: ['Prévue', 'Initiée', 'Annulée', 'Clôturée'],
      datasets: [
        {
          data: [
            this.stats.missionsByStatus.PREVUE,
            this.stats.missionsByStatus.INITIEE,
            this.stats.missionsByStatus.ANNULEE,
            this.stats.missionsByStatus.CLOTUREE
          ],
          backgroundColor: ['#FF9800', '#2196F3', '#F44336', '#4CAF50'],
          borderColor: ['#FF9800', '#2196F3', '#F44336', '#4CAF50'],
          fill: false
        }
      ]
    };

    // Chart: Missions par direction (top 5)
    if (this.stats.missionsByDirection && this.stats.missionsByDirection.length > 0) {
      this.directionsChart = {
        labels: this.stats.missionsByDirection.map(d => d.direction),
        datasets: [
          {
            label: 'Nombre de missions',
            data: this.stats.missionsByDirection.map(d => d.count),
            backgroundColor: '#673AB7',
            borderColor: '#673AB7',
            fill: false
          }
        ]
      };
    }
  }
}
