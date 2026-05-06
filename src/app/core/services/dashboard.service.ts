import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DashboardStats {
  totalMissions: number;
  totalAgents: number;
  totalChauffeurs: number;
  vehiculesDisponibles: number;
  missionsByStatus: {
    PREVUE: number;
    INITIEE: number;
    ANNULEE: number;
    CLOTUREE: number;
  };
  missionsByDirection: Array<{ direction: string; count: number }>;
  topChauffeur?: { nom: string; nombreMissions: number };
  topVehicule?: { immatriculation: string; nombreMissions: number };
}

export interface UpcomingMissions {
  count: number;
  missions: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/api/dashboard`;

  constructor(private http: HttpClient) {}

  getAnnualStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
  }

  getStatsByYear(year: number): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats/year`, {
      params: { annee: year }
    });
  }

  getUpcomingMissions(): Observable<UpcomingMissions> {
    return this.http.get<UpcomingMissions>(`${this.apiUrl}/missions-en-cours`);
  }
}
