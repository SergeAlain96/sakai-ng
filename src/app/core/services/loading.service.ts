import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new Subject<boolean>();
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private loadingMap = new Map<string, boolean>();

  show(key: string = 'default'): void {
    this.loadingMap.set(key, true);
    this.updateLoadingState();
  }

  hide(key: string = 'default'): void {
    this.loadingMap.delete(key);
    this.updateLoadingState();
  }

  isLoading(key: string = 'default'): boolean {
    return this.loadingMap.has(key);
  }

  private updateLoadingState(): void {
    this.loadingSubject.next(this.loadingMap.size > 0);
  }
}
