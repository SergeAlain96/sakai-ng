import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export enum StatutMission {
  PREVUE = 'PREVUE',
  INITIEE = 'INITIEE',
  ANNULEE = 'ANNULEE',
  CLOTUREE = 'CLOTUREE'
}

export interface MissionSummaryView {
  idMission: number;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  objetMission: string;
  statut: StatutMission;
  dateSoumission: string;
  idDirection: number;
  nomDirection: string;
}

export interface ParticipantView {
  idAgent: number;
  nom: string;
  prenom: string;
  matricule: string;
  roleMission: string;
}

export interface AffectationView {
  idAffectation: number;
  idChauffeur: number;
  nomChauffeur: string;
  prenomChauffeur: string;
  idVehicule: number;
  immatriculationVehicule: string;
  marqueVehicule: string;
  modeleVehicule: string;
}

export interface MissionDetailView extends MissionSummaryView {
  motifAnnulation?: string;
  participants: ParticipantView[];
  affectation?: AffectationView | null;
}

export interface MissionCreateRequest {
  dateDebut: string;
  dateFin: string;
  lieu: string;
  objetMission: string;
  idDirection: number;
  idAgents?: number[];
  rolesMission?: string[];
}

export interface MissionFilterParams {
  statut?: StatutMission;
  idDirection?: number;
  dateDebut?: Date;
  dateFin?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private apiUrl = `${environment.apiUrl}/api/missions`;

  constructor(private http: HttpClient) {}

  getAllMissions(filters?: MissionFilterParams): Observable<MissionSummaryView[]> {
    let params = new HttpParams();
    
    if (filters?.statut) {
      params = params.set('statut', filters.statut);
    }
    if (filters?.idDirection) {
      params = params.set('idDirection', filters.idDirection.toString());
    }
    if (filters?.dateDebut) {
      params = params.set('dateDebut', this.formatDate(filters.dateDebut));
    }
    if (filters?.dateFin) {
      params = params.set('dateFin', this.formatDate(filters.dateFin));
    }

    return this.http.get<MissionSummaryView[]>(this.apiUrl, { params });
  }

  getMissionById(id: number): Observable<MissionDetailView> {
    return this.http.get<MissionDetailView>(`${this.apiUrl}/${id}`);
  }

  createMission(request: MissionCreateRequest): Observable<MissionDetailView> {
    return this.http.post<MissionDetailView>(`${this.apiUrl}/soumettre`, request);
  }

  updateMission(id: number, request: MissionCreateRequest): Observable<MissionDetailView> {
    return this.http.put<MissionDetailView>(`${this.apiUrl}/${id}`, request);
  }

  validateMission(id: number): Observable<MissionDetailView> {
    return this.http.patch<MissionDetailView>(`${this.apiUrl}/${id}/valider`, {});
  }

  cancelMission(id: number, motif: string): Observable<MissionDetailView> {
    return this.http.patch<MissionDetailView>(`${this.apiUrl}/${id}/annuler`, { motif });
  }

  closeMission(id: number): Observable<MissionDetailView> {
    return this.http.patch<MissionDetailView>(`${this.apiUrl}/${id}/cloturer`, {});
  }

  getParticipants(id: number): Observable<ParticipantView[]> {
    return this.http.get<ParticipantView[]>(`${this.apiUrl}/${id}/participants`);
  }

  addParticipants(id: number, idAgents: number[], rolesMission: string[] = []): Observable<ParticipantView[]> {
    return this.http.post<ParticipantView[]>(`${this.apiUrl}/${id}/participants`, { idAgents, rolesMission });
  }

  removeParticipant(id: number, idAgent: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/participants/${idAgent}`);
  }

  assignResources(id: number, payload: { idChauffeur: number; idVehicule: number }): Observable<AffectationView> {
    return this.http.post<AffectationView>(`${this.apiUrl}/${id}/affecter`, payload);
  }

  removeAffectation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/affectation`);
  }

  getAffectationsByChauffeur(idChauffeur: number): Observable<AffectationView[]> {
    return this.http.get<AffectationView[]>(`${environment.apiUrl}/api/affectations/chauffeur/${idChauffeur}`);
  }

  downloadMissionFiche(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/fiche`, { responseType: 'blob' });
  }

  deleteMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
