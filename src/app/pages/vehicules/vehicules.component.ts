import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import {
  StatutVehicule,
  Vehicule,
  VehiculeCreateRequest,
  VehiculeService
} from '../../core/services/vehicule.service';
import { LoadingSpinnerComponent } from '../../core/components/loading-spinner.component';

@Component({
  selector: 'app-vehicules',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    ToastModule,
    ConfirmDialogModule,
    LoadingSpinnerComponent
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <p-toast position="top-right"></p-toast>
    <p-confirmDialog></p-confirmDialog>

    <app-loading-spinner [isLoading]="loading" message="Chargement des véhicules..."></app-loading-spinner>

    <div class="vehicules-page">
      <div class="header">
        <div>
          <h2>🚗 Gestion des Véhicules</h2>
          <p>Inventaire, disponibilité et suivi des véhicules.</p>
        </div>
        <p-button severity="success" icon="pi pi-plus" label="➕ Nouveau véhicule" (click)="openCreateDialog()"></p-button>
      </div>

      <div class="card filters">
        <div class="grid">
          <div>
            <label>Statut</label>
            <p-select
              [options]="statusOptions"
              optionLabel="label"
              optionValue="value"
              [(ngModel)]="selectedStatus"
              placeholder="Tous"
              [showClear]="true">
            </p-select>
          </div>
          <div>
            <label>Recherche</label>
            <input
              pInputText
              class="w-full"
              [(ngModel)]="search"
              placeholder="Immatriculation / Marque / Modèle" />
          </div>
        </div>
        <div class="actions">
          <p-button label="🔍 Rechercher" icon="pi pi-search" (click)="applyFilters()"></p-button>
          <p-button label="↺ Réinitialiser" severity="secondary" outlined (click)="resetFilters()"></p-button>
        </div>
      </div>

      <p-table
        [value]="filteredVehicules"
        [loading]="loading"
        [paginator]="true"
        [rows]="10"
        responsiveLayout="scroll"
        styleClass="p-datatable-striped card">
        <ng-template pTemplate="header">
          <tr>
            <th pSortableColumn="immatriculation">Immatriculation <p-sortIcon field="immatriculation"></p-sortIcon></th>
            <th pSortableColumn="marque">Marque <p-sortIcon field="marque"></p-sortIcon></th>
            <th pSortableColumn="modele">Modèle <p-sortIcon field="modele"></p-sortIcon></th>
            <th>Type</th>
            <th>Capacité</th>
            <th pSortableColumn="statut">Statut <p-sortIcon field="statut"></p-sortIcon></th>
            <th style="width: 240px">Actions</th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-v>
          <tr class="table-row">
            <td><span class="plate-badge">🏷️ {{ v.immatriculation }}</span></td>
            <td>{{ v.marque }}</td>
            <td>{{ v.modele }}</td>
            <td>{{ v.typeVehicule || '-' }}</td>
            <td>{{ v.capacite ?? '-' }}</td>
            <td><span class="status-badge" [ngClass]="'status-' + v.statut.toLowerCase()">{{ v.statut }}</span></td>
            <td class="row-actions">
              <p-button
                icon="pi pi-pencil"
                pTooltip="✏️ Modifier"
                tooltipPosition="top"
                [rounded]="true"
                [text]="true"
                severity="secondary"
                (click)="openEditDialog(v)"></p-button>

              <p-button
                icon="pi pi-refresh"
                pTooltip="🔁 Changer statut"
                tooltipPosition="top"
                [rounded]="true"
                [text]="true"
                severity="info"
                (click)="openStatusDialog(v)"></p-button>

              <p-button
                icon="pi pi-trash"
                pTooltip="🗑️ Supprimer"
                tooltipPosition="top"
                [rounded]="true"
                [text]="true"
                severity="danger"
                (click)="confirmDelete(v)"></p-button>
            </td>
          </tr>
        </ng-template>

        <ng-template pTemplate="emptymessage">
          <tr><td colspan="7" class="empty-message">🚗 Aucun véhicule trouvé</td></tr>
        </ng-template>
      </p-table>
    </div>

    <p-dialog
      [(visible)]="showDialog"
      [modal]="true"
      [maximizable]="true"
      [style]="{ width: '760px' }"
      [header]="isEdit ? '✏️ Modifier Véhicule' : '➕ Nouveau Véhicule'"
      (onHide)="closeDialog()">
      <div class="dialog-grid">
        <div>
          <label>🏷️ Immatriculation *</label>
          <input pInputText class="w-full" [(ngModel)]="form.immatriculation" placeholder="Ex: LT-1234" />
        </div>
        <div>
          <label>🏭 Marque *</label>
          <input pInputText class="w-full" [(ngModel)]="form.marque" placeholder="Ex: Toyota" />
        </div>
        <div>
          <label>🧩 Modèle *</label>
          <input pInputText class="w-full" [(ngModel)]="form.modele" placeholder="Ex: Hilux" />
        </div>
        <div>
          <label>🚙 Type</label>
          <input pInputText class="w-full" [(ngModel)]="form.typeVehicule" placeholder="Ex: 4x4" />
        </div>
        <div>
          <label>👥 Capacité</label>
          <input pInputText class="w-full" [(ngModel)]="form.capacite" placeholder="Ex: 5" />
        </div>
      </div>

      <div class="dialog-actions">
        <p-button label="Annuler" severity="secondary" outlined (click)="closeDialog()"></p-button>
        <p-button [label]="isEdit ? '✅ Mettre à jour' : '➕ Créer'" (click)="saveVehicule()" [loading]="saving"></p-button>
      </div>
    </p-dialog>

    <p-dialog
      [(visible)]="showStatusDialog"
      [modal]="true"
      [style]="{ width: '520px' }"
      header="🔁 Changer le statut"
      (onHide)="closeStatusDialog()">
      <div class="dialog-grid status-dialog">
        <div class="full">
          <label>Statut</label>
          <p-select
            [options]="statusOptions"
            optionLabel="label"
            optionValue="value"
            [(ngModel)]="statusForm.statut"
            placeholder="Sélectionner un statut"></p-select>
        </div>
      </div>
      <div class="dialog-actions">
        <p-button label="Annuler" severity="secondary" outlined (click)="closeStatusDialog()"></p-button>
        <p-button label="✅ Appliquer" (click)="applyStatus()" [loading]="saving"></p-button>
      </div>
    </p-dialog>
  `,
  styles: [`
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .vehicules-page { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; animation: slideUp 0.6s ease-out; }
    .header { display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; }
    .header h2 { margin:0; font-size:1.875rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .header p { margin:.25rem 0 0; color: var(--text-color-secondary, #666); }

    .card { background: var(--surface-card, #fff); border-radius: 1rem; padding: 1rem; box-shadow: 0 8px 30px rgba(0,0,0,.06); }
    .filters .grid { display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
    .filters label { display:block; margin-bottom:.4rem; font-weight:600; }
    .actions { display:flex; gap:.75rem; justify-content:flex-end; margin-top:1rem; }

    .table-row:hover { background-color: var(--highlight-bg, #f8f9fa); }
    .row-actions { display:flex; gap:.25rem; }

    .plate-badge { display:inline-flex; align-items:center; padding:.35rem .65rem; background:#eff6ff; color:#1e40af; border-radius:.5rem; font-size:.875rem; font-weight:600; }
    .status-badge { display:inline-flex; padding:.35rem .65rem; border-radius:9999px; font-size:.78rem; font-weight:700; }
    .status-disponible { background:#dcfce7; color:#166534; }
    .status-en_maintenance { background:#fef3c7; color:#92400e; }
    .status-en_mission { background:#dbeafe; color:#1e40af; }

    .empty-message { text-align:center; padding: 2rem 1.5rem; color: var(--text-color-secondary); font-size: 1rem; }

    .dialog-grid { display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
    .dialog-grid label { display:block; margin-bottom:.4rem; font-weight:600; }
    .full { grid-column: 1 / -1; }
    .dialog-actions { display:flex; gap:.75rem; justify-content:flex-end; margin-top: 1.5rem; }

    @media (max-width: 768px) {
      .filters .grid, .dialog-grid { grid-template-columns: 1fr; }
      .header { flex-direction: column; }
      .vehicules-page { padding: 1rem; }
    }
  `]
})
export class VehiculesComponent implements OnInit {
  vehicules: Vehicule[] = [];
  filteredVehicules: Vehicule[] = [];

  loading = false;
  saving = false;

  showDialog = false;
  isEdit = false;
  editingId: number | null = null;

  showStatusDialog = false;
  statusEditingId: number | null = null;

  selectedStatus: StatutVehicule | null = null;
  search = '';

  form: {
    immatriculation: string;
    marque: string;
    modele: string;
    typeVehicule?: string;
    capacite?: number | null;
  } = {
    immatriculation: '',
    marque: '',
    modele: '',
    typeVehicule: '',
    capacite: null
  };

  statusForm: { statut: StatutVehicule | null } = { statut: null };

  statusOptions = [
    { label: 'Disponible', value: StatutVehicule.DISPONIBLE },
    { label: 'En maintenance', value: StatutVehicule.EN_MAINTENANCE },
    { label: 'En mission', value: StatutVehicule.EN_MISSION }
  ];

  constructor(
    private readonly vehiculeService: VehiculeService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.loading = true;
    this.vehiculeService.getAllVehicules().subscribe({
      next: (data) => {
        this.vehicules = data;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les véhicules' });
      }
    });
  }

  applyFilters(): void {
    const normalizedSearch = this.search.trim().toLowerCase();

    this.filteredVehicules = this.vehicules.filter((v) => {
      const matchesStatus = !this.selectedStatus || v.statut === this.selectedStatus;
      const matchesSearch =
        !normalizedSearch ||
        v.immatriculation.toLowerCase().includes(normalizedSearch) ||
        v.marque.toLowerCase().includes(normalizedSearch) ||
        v.modele.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }

  resetFilters(): void {
    this.selectedStatus = null;
    this.search = '';
    this.applyFilters();
  }

  openCreateDialog(): void {
    this.isEdit = false;
    this.editingId = null;
    this.form = { immatriculation: '', marque: '', modele: '', typeVehicule: '', capacite: null };
    this.showDialog = true;
  }

  openEditDialog(v: Vehicule): void {
    this.isEdit = true;
    this.editingId = v.idVehicule ?? null;
    this.form = {
      immatriculation: v.immatriculation,
      marque: v.marque,
      modele: v.modele,
      typeVehicule: v.typeVehicule ?? '',
      capacite: v.capacite ?? null
    };
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  saveVehicule(): void {
    if (!this.form.immatriculation?.trim() || !this.form.marque?.trim() || !this.form.modele?.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Immatriculation, marque et modèle sont obligatoires' });
      return;
    }

    const payload: VehiculeCreateRequest = {
      immatriculation: this.form.immatriculation.trim(),
      marque: this.form.marque.trim(),
      modele: this.form.modele.trim(),
      typeVehicule: this.form.typeVehicule?.trim() || undefined,
      capacite: this.form.capacite ?? undefined
    };

    this.saving = true;

    const request$ = this.isEdit && this.editingId
      ? this.vehiculeService.updateVehicule(this.editingId, payload)
      : this.vehiculeService.createVehicule(payload);

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.showDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: this.isEdit ? 'Véhicule mis à jour' : 'Véhicule créé' });
        this.loadVehicules();
      },
      error: (error) => {
        this.saving = false;
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error?.message || 'Impossible d’enregistrer le véhicule' });
      }
    });
  }

  openStatusDialog(v: Vehicule): void {
    this.statusEditingId = v.idVehicule ?? null;
    this.statusForm = { statut: v.statut };
    this.showStatusDialog = true;
  }

  closeStatusDialog(): void {
    this.showStatusDialog = false;
    this.statusEditingId = null;
  }

  applyStatus(): void {
    if (!this.statusEditingId || !this.statusForm.statut) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Veuillez sélectionner un statut' });
      return;
    }

    this.saving = true;
    this.vehiculeService.updateStatut(this.statusEditingId, this.statusForm.statut).subscribe({
      next: () => {
        this.saving = false;
        this.showStatusDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Statut mis à jour' });
        this.loadVehicules();
      },
      error: (error) => {
        this.saving = false;
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error?.message || 'Impossible de mettre à jour le statut' });
      }
    });
  }

  confirmDelete(v: Vehicule): void {
    if (!v.idVehicule) return;

    this.confirmationService.confirm({
      message: `Supprimer le véhicule "${v.immatriculation}" ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteVehicule(v.idVehicule!)
    });
  }

  private deleteVehicule(id: number): void {
    this.loading = true;
    this.vehiculeService.deleteVehicule(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Véhicule supprimé' });
        this.loadVehicules();
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error?.message || 'Impossible de supprimer le véhicule' });
      }
    });
  }
}
