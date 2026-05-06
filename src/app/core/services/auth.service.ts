import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  matricule: string;
  email: string;
  motDePasse: string;
  fonction?: string;
  telephone?: string;
  estChauffeur: boolean;
  role: string;
  idDirection: number;
}

export interface RegisterResponse {
  idAgent: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  nomDirection: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  idAgent: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  nomDirection: string;
}

export interface StoredUser extends AuthResponse {
  username: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private currentUserSubject = new BehaviorSubject<StoredUser | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        const normalizedUser: StoredUser = {
          ...response,
          username: response.email,
          roles: response.role ? [response.role] : []
        };
        this.storeToken(response.token);
        this.storeUser(normalizedUser);
        this.currentUserSubject.next(normalizedUser);
      })
    );
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, request);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getCurrentUser(): StoredUser | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.includes(role) ?? false;
  }

  private storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  private storeUser(user: StoredUser): void {
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  private getUserFromStorage(): StoredUser | null {
    const user = localStorage.getItem('current_user');
    return user ? (JSON.parse(user) as StoredUser) : null;
  }
}
