import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export enum StatutVehicule {
  DISPONIBLE = 'DISPONIBLE',
  EN_MAINTENANCE = 'EN_MAINTENANCE',
  EN_MISSION = 'EN_MISSION'
}

export interface Vehicule {
  idVehicule?: number;
  immatriculation: string;
  marque: string;
  modele: string;
  typeVehicule?: string;
  capacite?: number;
  statut: StatutVehicule;
  dateAcquisition?: string;
  actif: boolean;
}

export interface VehiculeCreateRequest {
  immatriculation: string;
  marque: string;
  modele: string;
  typeVehicule?: string;
  capacite?: number;
  dateAcquisition?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private apiUrl = `${environment.apiUrl}/api/vehicules`;

  constructor(private http: HttpClient) {}

  getAllVehicules(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.apiUrl);
  }

  getVehiculeById(id: number): Observable<Vehicule> {
    return this.http.get<Vehicule>(`${this.apiUrl}/${id}`);
  }

  getDisponibleVehicules(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(`${this.apiUrl}/disponibles`);
  }

  createVehicule(request: VehiculeCreateRequest): Observable<Vehicule> {
    return this.http.post<Vehicule>(this.apiUrl, request);
  }

  updateVehicule(id: number, request: VehiculeCreateRequest): Observable<Vehicule> {
    return this.http.put<Vehicule>(`${this.apiUrl}/${id}`, request);
  }

  updateStatut(id: number, statut: StatutVehicule): Observable<Vehicule> {
    return this.http.patch<Vehicule>(`${this.apiUrl}/${id}/statut`, { statut });
  }

  deleteVehicule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
