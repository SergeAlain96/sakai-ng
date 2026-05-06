import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DirectionService, Direction, DirectionRequest } from '../../core/services/direction.service';
import { LoadingSpinnerComponent } from '../../core/components/loading-spinner.component';

@Component({
  selector: 'app-directions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    LoadingSpinnerComponent
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <p-toast position="top-right"></p-toast>
    <app-loading-spinner [isLoading]="loading" message="Chargement des directions..."></app-loading-spinner>

    <div class="directions-page">
      <div class="header">
        <div>
          <h2>🏢 Gestion des Directions</h2>
          <p>Gérez les directions/départements de votre organisation.</p>
        </div>
        <p-button 
          severity="success"
          icon="pi pi-plus" 
          label="➕ Nouvelle Direction" 
          (click)="showAddDialog()">
        </p-button>
      </div>

      <p-table 
        [value]="directions" 
        [loading]="loading"
        [paginator]="true" 
        [rows]="10"
        responsiveLayout="scroll"
        styleClass="p-datatable-striped card">
        <ng-template pTemplate="header">
          <tr>
            <th pSortableColumn="idDirection">ID <p-sortIcon field="idDirection"></p-sortIcon></th>
            <th pSortableColumn="nomDirection">🏷️ Nom Direction <p-sortIcon field="nomDirection"></p-sortIcon></th>
            <th style="width: 200px">Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-direction>
          <tr class="table-row">
            <td><strong>#{{ direction.idDirection }}</strong></td>
            <td><span class="direction-badge">{{ direction.nomDirection }}</span></td>
            <td class="row-actions">
              <p-button 
                icon="pi pi-pencil" 
                pTooltip="✏️ Modifier"
                tooltipPosition="top"
                [rounded]="true" 
                [text]="true"
                severity="info"
                (click)="showEditDialog(direction)">
              </p-button>
              <p-button 
                icon="pi pi-trash" 
                pTooltip="🗑️ Supprimer"
                tooltipPosition="top"
                [rounded]="true" 
                [text]="true"
                severity="danger"
                (click)="confirmDelete(direction)">
              </p-button>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="3" class="empty-message">🏢 Aucune direction trouvée</td>
          </tr>
        </ng-template>
      </p-table>

      <p-dialog 
        [(visible)]="showDialog" 
        [header]="isEdit ? '✏️ Modifier Direction' : '➕ Nouvelle Direction'"
        [modal]="true"
        [maximizable]="true"
        [style]="{width: '500px'}"
        [closeOnEscape]="true"
        (onHide)="resetForm()">
        <form [formGroup]="directionForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="nomDirection">🏷️ Nom de la Direction *</label>
            <input 
              pInputText 
              id="nomDirection"
              formControlName="nomDirection"
              type="text"
              class="w-full"
              placeholder="Ex: Direction Générale">
            <small class="error-message" *ngIf="directionForm.get('nomDirection')?.invalid && directionForm.get('nomDirection')?.touched">
              Le nom est requis (minimum 3 caractères)
            </small>
          </div>

          <div class="dialog-actions">
            <p-button 
              type="button" 
              label="Annuler" 
              severity="secondary"
              outlined
              (click)="showDialog = false">
            </p-button>
            <p-button 
              type="submit" 
              [label]="isEdit ? '✅ Mettre à jour' : '➕ Créer'"
              [loading]="loading"
              [disabled]="directionForm.invalid">
            </p-button>
          </div>
        </form>
      </p-dialog>

      <p-confirmDialog></p-confirmDialog>
    </div>
  `,
  styles: [`
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .directions-page {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      animation: slideUp 0.6s ease-out;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }
    .header h2 {
      margin: 0;
      font-size: 1.875rem;
      background: linear-gradient(135deg, #0D5C3F 0%, #8B0000 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .header p {
      margin: 0.25rem 0 0;
      color: var(--text-color-secondary, #666);
    }
    .card {
      background: var(--surface-card, #fff);
      border-radius: 1rem;
      padding: 1rem;
      box-shadow: 0 8px 30px rgba(0,0,0,.06);
    }
    .table-row:hover {
      background-color: var(--highlight-bg, #f8f9fa);
    }
    .direction-badge {
      display: inline-flex;
      padding: 0.5rem 0.75rem;
      background: linear-gradient(135deg, #0D5C3F 0%, #8B0000 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 600;
    }
    .row-actions {
      display: flex;
      gap: 0.25rem;
    }
    .empty-message {
      text-align: center;
      padding: 2rem 1.5rem;
      color: var(--text-color-secondary);
      font-size: 1rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }
    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
      font-size: 0.95rem;
    }
    .form-group input:focus {
      border-color: #0D5C3F;
      outline: none;
    }
    .error-message {
      color: #991b1b;
      font-size: 0.875rem;
      display: block;
      margin-top: 0.25rem;
    }
    .dialog-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
      margin-top: 1.5rem;
    }
    @media (max-width: 768px) {
      .header {
        flex-direction: column;
      }
      .directions-page {
        padding: 1rem;
      }
    }
  `]
})
export class DirectionsComponent implements OnInit {
  directions: Direction[] = [];
  showDialog = false;
  isEdit = false;
  loading = false;
  directionForm: FormGroup;
  selectedDirection: Direction | null = null;

  constructor(
    private readonly directionService: DirectionService,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {
    this.directionForm = this.formBuilder.group({
      nomDirection: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.loadDirections();
  }

  loadDirections(): void {
    this.loading = true;
    this.directionService.getAllDirections().subscribe({
      next: (data: Direction[]) => {
        this.directions = data;
        this.loading = false;
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les directions' });
        this.loading = false;
      }
    });
  }

  showAddDialog(): void {
    this.isEdit = false;
    this.selectedDirection = null;
    this.directionForm.reset();
    this.showDialog = true;
  }

  showEditDialog(direction: Direction): void {
    this.isEdit = true;
    this.selectedDirection = direction;
    this.directionForm.patchValue(direction);
    this.showDialog = true;
  }

  onSubmit(): void {
    if (this.directionForm.invalid) return;

    this.loading = true;
    const request: DirectionRequest = this.directionForm.value;

    if (this.isEdit && this.selectedDirection?.idDirection) {
      this.directionService.updateDirection(this.selectedDirection.idDirection, request).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Direction mise à jour' });
          this.showDialog = false;
          this.loadDirections();
          this.loading = false;
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de mettre à jour' });
          this.loading = false;
        }
      });
    } else {
      this.directionService.createDirection(request).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Direction créée' });
          this.showDialog = false;
          this.loadDirections();
          this.loading = false;
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de créer' });
          this.loading = false;
        }
      });
    }
  }

  confirmDelete(direction: Direction): void {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir supprimer "${direction.nomDirection}"?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (direction.idDirection) {
          this.loading = true;
          this.directionService.deleteDirection(direction.idDirection).subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Direction supprimée' });
              this.loadDirections();
              this.loading = false;
            },
            error: (error: any) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer' });
              this.loading = false;
            }
          });
        }
      }
    });
  }

  resetForm(): void {
    this.directionForm.reset();
    this.selectedDirection = null;
    this.isEdit = false;
  }
}
