import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export enum StatutAbsence {
  PLANIFIEE = 'PLANIFIEE',
  EN_COURS = 'EN_COURS',
  COMPLETEE = 'COMPLETEE',
  ANNULEE = 'ANNULEE'
}

export interface Absence {
  id?: number;
  dateDebut: Date;
  dateFin: Date;
  raison: string;
  statut: StatutAbsence;
  agent: {
    id: number;
    nom: string;
    prenom: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AbsenceCreateRequest {
  dateDebut: Date;
  dateFin: Date;
  raison: string;
  idAgent: number;
}

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl = `${environment.apiUrl}/api/absences`;

  constructor(private http: HttpClient) {}

  getAllAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(this.apiUrl);
  }

  getAbsenceById(id: number): Observable<Absence> {
    return this.http.get<Absence>(`${this.apiUrl}/${id}`);
  }

  getAbsencesByAgent(idAgent: number): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.apiUrl}/agent/${idAgent}`);
  }

  createAbsence(request: AbsenceCreateRequest): Observable<Absence> {
    return this.http.post<Absence>(this.apiUrl, request);
  }

  updateAbsence(id: number, request: AbsenceCreateRequest): Observable<Absence> {
    return this.http.put<Absence>(`${this.apiUrl}/${id}`, request);
  }

  approveAbsence(id: number): Observable<Absence> {
    return this.http.patch<Absence>(`${this.apiUrl}/${id}/approuver`, {});
  }

  rejectAbsence(id: number): Observable<Absence> {
    return this.http.patch<Absence>(`${this.apiUrl}/${id}/rejeter`, {});
  }

  deleteAbsence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
