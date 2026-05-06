import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export enum RoleAgent {
  ADMINISTRATEUR = 'ADMINISTRATEUR',
  CHARGE_ETUDE = 'CHARGE_ETUDE',
  AGENT = 'AGENT'
}

export interface Agent {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  matricule: string;
  fonction: string;
  telephone?: string;
  username: string;
  estChauffeur: boolean;
  role: RoleAgent;
  direction: {
    idDirection: number;
    nomDirection: string;
  };
  actif: boolean;
}

export interface AgentUpdateRequest {
  nom: string;
  prenom: string;
  matricule: string;
  email: string;
  fonction: string;
  telephone?: string;
  estChauffeur: boolean;
  role: RoleAgent;
  idDirection: number;
  actif: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private readonly apiUrl = `${environment.apiUrl}/api/agents`;

  constructor(private readonly http: HttpClient) {}

  getAllAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.apiUrl);
  }

  getAgentById(id: number): Observable<Agent> {
    return this.http.get<Agent>(`${this.apiUrl}/${id}`);
  }

  getAllChauffeurs(): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.apiUrl}/chauffeurs`);
  }

  getAgentsByDirection(idDirection: number): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.apiUrl}/direction/${idDirection}`);
  }

  updateAgent(id: number, request: AgentUpdateRequest): Observable<Agent> {
    return this.http.put<Agent>(`${this.apiUrl}/${id}`, request);
  }

  deactivateAgent(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/desactiver`, {});
  }
}
