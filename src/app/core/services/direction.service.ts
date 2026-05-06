import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Direction {
  idDirection?: number;
  nomDirection: string;
}

export interface DirectionRequest {
  nomDirection: string;
}

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  private readonly apiUrl = `${environment.apiUrl}/api/directions`;

  constructor(private readonly http: HttpClient) {}

  getAllDirections(): Observable<Direction[]> {
    return this.http.get<Direction[]>(this.apiUrl);
  }

  getDirectionById(id: number): Observable<Direction> {
    return this.http.get<Direction>(`${this.apiUrl}/${id}`);
  }

  createDirection(request: DirectionRequest): Observable<Direction> {
    return this.http.post<Direction>(this.apiUrl, request);
  }

  updateDirection(id: number, request: DirectionRequest): Observable<Direction> {
    return this.http.put<Direction>(`${this.apiUrl}/${id}`, request);
  }

  deleteDirection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
