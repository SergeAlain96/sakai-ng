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
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <div class="carfo-container">
      <div class="header-section">
        <h2>Gestion des Directions</h2>
        <p-button 
          icon="pi pi-plus" 
          label="Nouvelle Direction" 
          (click)="showAddDialog()"
          [loading]="loading">
        </p-button>
      </div>

      <p-table 
        [value]="directions" 
        [loading]="loading"
        [paginator]="true" 
        [rows]="10"
        responsiveLayout="scroll"
        styleClass="p-datatable-striped">
        <ng-template pTemplate="header">
          <tr>
            <th pSortableColumn="idDirection">ID <p-sortIcon field="idDirection"></p-sortIcon></th>
            <th pSortableColumn="nomDirection">Nom Direction <p-sortIcon field="nomDirection"></p-sortIcon></th>
            <th style="width: 200px">Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-direction>
          <tr>
            <td>{{ direction.idDirection }}</td>
            <td>{{ direction.nomDirection }}</td>
            <td>
              <p-button 
                icon="pi pi-pencil" 
                [rounded]="true" 
                [text]="true"
                severity="info"
                (click)="showEditDialog(direction)"
                pTooltip="Modifier"
                tooltipPosition="top">
              </p-button>
              <p-button 
                icon="pi pi-trash" 
                [rounded]="true" 
                [text]="true"
                severity="danger"
                (click)="confirmDelete(direction)"
                pTooltip="Supprimer"
                tooltipPosition="top">
              </p-button>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="3" class="text-center p-4">Aucune direction trouvée</td>
          </tr>
        </ng-template>
      </p-table>

      <p-dialog 
        [(visible)]="showDialog" 
        [header]="isEdit ? 'Modifier Direction' : 'Nouvelle Direction'"
        [modal]="true" 
        [style]="{width: '400px'}"
        [closeOnEscape]="true"
        (onHide)="resetForm()">
        <form [formGroup]="directionForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="nomDirection">Nom de la Direction *</label>
            <input 
              pInputText 
              id="nomDirection"
              formControlName="nomDirection"
              type="text"
              class="w-full"
              placeholder="Ex: Direction Générale">
            <small class="text-red-500" *ngIf="directionForm.get('nomDirection')?.invalid && directionForm.get('nomDirection')?.touched">
              Le nom est requis
            </small>
          </div>

          <ng-template pTemplate="footer">
            <p-button 
              type="button" 
              label="Annuler" 
              (click)="showDialog = false"
              [text]="true">
            </p-button>
            <p-button 
              type="submit" 
              [label]="isEdit ? 'Mettre à jour' : 'Créer'"
              [loading]="loading"
              [disabled]="directionForm.invalid">
            </p-button>
          </ng-template>
        </form>
      </p-dialog>

      <p-toast position="top-right"></p-toast>
      <p-confirmDialog></p-confirmDialog>
    </div>
  `,
  styles: [`
    .carfo-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header-section h2 {
      margin: 0;
      color: var(--carfo-primary);
      font-size: 1.5rem;
      font-weight: 600;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.95rem;
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
