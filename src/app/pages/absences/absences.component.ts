import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { Absence, AbsenceCreateRequest, AbsenceService, StatutAbsence } from '../../core/services/absence.service';
import { Agent, AgentService } from '../../core/services/agent.service';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    DatePickerModule,
    DialogModule,
    InputTextModule,
    RippleModule,
    SelectModule,
    TableModule,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <p-toast></p-toast>

    <div class="absences-page">
      <div class="header">
        <div>
          <h2>Gestion des absences</h2>
          <p>Déclaration, validation et suivi des absences des agents.</p>
        </div>
        <p-button label="Nouvelle absence" icon="pi pi-plus" (click)="openCreateDialog()"></p-button>
      </div>

      <div class="card filters">
        <div class="grid">
          <div>
            <label>Agent</label>
            <p-select
              [options]="agentsOptions"
              optionLabel="displayName"
              optionValue="id"
              [(ngModel)]="selectedAgentId"
              placeholder="Tous les agents"
              [showClear]="true">
            </p-select>
          </div>
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
        </div>
        <div class="actions">
          <p-button label="Rechercher" icon="pi pi-search" (click)="loadAbsences()"></p-button>
          <p-button label="Réinitialiser" severity="secondary" outlined (click)="resetFilters()"></p-button>
        </div>
      </div>

      <p-table [value]="absences" [loading]="loading" [paginator]="true" [rows]="10" responsiveLayout="scroll" styleClass="p-datatable-striped card">
        <ng-template pTemplate="header">
          <tr>
            <th>Agent</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Raison</th>
            <th>Statut</th>
            <th style="width: 250px">Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-absence>
          <tr>
            <td>{{ absence.agent?.prenom }} {{ absence.agent?.nom }}</td>
            <td>{{ absence.dateDebut | date:'yyyy-MM-dd' }}</td>
            <td>{{ absence.dateFin | date:'yyyy-MM-dd' }}</td>
            <td>{{ absence.raison }}</td>
            <td><span class="status-badge" [ngClass]="'status-' + absence.statut.toLowerCase()">{{ absence.statut }}</span></td>
            <td class="row-actions">
              <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="secondary" (click)="openEditDialog(absence)"></p-button>
              <p-button icon="pi pi-check" [rounded]="true" [text]="true" severity="success" (click)="approveAbsence(absence.id!)"></p-button>
              <p-button icon="pi pi-times" [rounded]="true" [text]="true" severity="warn" (click)="rejectAbsence(absence.id!)"></p-button>
              <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger" (click)="deleteAbsence(absence.id!)"></p-button>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr><td colspan="6" class="empty">Aucune absence trouvée</td></tr>
        </ng-template>
      </p-table>
    </div>

    <p-dialog [(visible)]="showDialog" [modal]="true" [style]="{ width: '760px' }" [header]="isEdit ? 'Modifier absence' : 'Nouvelle absence'" (onHide)="closeDialog()">
      <div class="dialog-grid">
        <div class="full">
          <label>Agent</label>
          <p-select [options]="agentsOptions" optionLabel="displayName" optionValue="id" [(ngModel)]="form.idAgent" placeholder="Sélectionner un agent"></p-select>
        </div>
        <div>
          <label>Date de début</label>
          <p-datepicker [(ngModel)]="form.dateDebut" [showIcon]="true"></p-datepicker>
        </div>
        <div>
          <label>Date de fin</label>
          <p-datepicker [(ngModel)]="form.dateFin" [showIcon]="true"></p-datepicker>
        </div>
        <div class="full">
          <label>Raison</label>
          <input pInputText [(ngModel)]="form.raison" class="w-full" placeholder="Raison de l'absence" />
        </div>
      </div>
      <div class="dialog-actions">
        <p-button label="Annuler" severity="secondary" outlined (click)="closeDialog()"></p-button>
        <p-button [label]="isEdit ? 'Mettre à jour' : 'Déclarer'" (click)="saveAbsence()" [loading]="saving"></p-button>
      </div>
    </p-dialog>
  `,
  styles: [`
    .absences-page { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
    .header { display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; }
    .header h2 { margin:0; }
    .header p { margin:.25rem 0 0; color: var(--text-color-secondary, #666); }
    .card { background: var(--surface-card, #fff); border-radius: 1rem; padding: 1rem; box-shadow: 0 8px 30px rgba(0,0,0,.06); }
    .filters .grid, .dialog-grid { display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
    .filters label, .dialog-grid label { display:block; margin-bottom:.4rem; font-weight:600; }
    .actions, .dialog-actions { display:flex; gap:.75rem; justify-content:flex-end; margin-top:1rem; }
    .row-actions { display:flex; gap:.25rem; }
    .empty { text-align:center; padding: 1.5rem; }
    .full { grid-column: 1 / -1; }
    .status-badge { display:inline-flex; padding:.35rem .65rem; border-radius:9999px; font-size:.78rem; font-weight:700; }
    .status-en_attente, .status-planifiee { background:#fef3c7; color:#92400e; }
    .status-approuve, .status-terminee { background:#dcfce7; color:#166534; }
    .status-rejetee, .status-annulee { background:#fee2e2; color:#991b1b; }
    @media (max-width: 768px) {
      .filters .grid, .dialog-grid { grid-template-columns: 1fr; }
      .header { flex-direction: column; }
    }
  `]
})
export class AbsencesComponent implements OnInit {
  absences: Absence[] = [];
  agentsOptions: Array<Agent & { displayName: string }> = [];
  loading = false;
  saving = false;
  showDialog = false;
  isEdit = false;
  editingId: number | null = null;
  selectedAgentId: number | null = null;
  selectedStatus: StatutAbsence | null = null;

  form = {
    idAgent: null as number | null,
    dateDebut: null as Date | null,
    dateFin: null as Date | null,
    raison: ''
  };

  statusOptions = [
    { label: 'Planifiée', value: StatutAbsence.PLANIFIEE },
    { label: 'En cours', value: StatutAbsence.EN_COURS },
    { label: 'Complétée', value: StatutAbsence.COMPLETEE },
    { label: 'Annulée', value: StatutAbsence.ANNULEE }
  ];

  constructor(
    private readonly absenceService: AbsenceService,
    private readonly agentService: AgentService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadAgents();
    this.loadAbsences();
  }

  loadAgents(): void {
    this.agentService.getAllAgents().subscribe({
      next: (data) => {
        this.agentsOptions = data.map((agent) => ({
          ...agent,
          displayName: `${agent.prenom} ${agent.nom} (${agent.matricule})`
        }));
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les agents' })
    });
  }

  loadAbsences(): void {
    this.loading = true;
    const request$ = this.selectedAgentId
      ? this.absenceService.getAbsencesByAgent(this.selectedAgentId)
      : this.absenceService.getAllAbsences();

    request$.subscribe({
      next: (data) => {
        this.absences = this.selectedStatus ? data.filter((absence) => absence.statut === this.selectedStatus) : data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les absences' });
      }
    });
  }

  resetFilters(): void {
    this.selectedAgentId = null;
    this.selectedStatus = null;
    this.loadAbsences();
  }

  openCreateDialog(): void {
    this.isEdit = false;
    this.editingId = null;
    this.form = { idAgent: null, dateDebut: null, dateFin: null, raison: '' };
    this.showDialog = true;
  }

  openEditDialog(absence: Absence): void {
    this.isEdit = true;
    this.editingId = absence.id ?? null;
    this.form = {
      idAgent: absence.agent?.id ?? null,
      dateDebut: new Date(absence.dateDebut),
      dateFin: new Date(absence.dateFin),
      raison: absence.raison
    };
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  saveAbsence(): void {
    if (!this.form.idAgent || !this.form.dateDebut || !this.form.dateFin || !this.form.raison) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Tous les champs sont obligatoires' });
      return;
    }

    const payload: AbsenceCreateRequest = {
      idAgent: this.form.idAgent,
      raison: this.form.raison,
      dateDebut: this.form.dateDebut,
      dateFin: this.form.dateFin
    };

    this.saving = true;
    const request$ = this.isEdit && this.editingId
      ? this.absenceService.updateAbsence(this.editingId, payload)
      : this.absenceService.createAbsence(payload);

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.showDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: this.isEdit ? 'Absence mise à jour' : 'Absence déclarée' });
        this.loadAbsences();
      },
      error: (error) => {
        this.saving = false;
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error?.message || 'Impossible d’enregistrer l’absence' });
      }
    });
  }

  approveAbsence(id: number): void {
    this.absenceService.approveAbsence(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Absence approuvée' });
        this.loadAbsences();
      },
      error: (error) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error?.message || 'Impossible d’approuver l’absence' })
    });
  }

  rejectAbsence(id: number): void {
    this.absenceService.rejectAbsence(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Absence rejetée' });
        this.loadAbsences();
      },
      error: (error) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error?.message || 'Impossible de rejeter l’absence' })
    });
  }

  deleteAbsence(id: number): void {
    this.absenceService.deleteAbsence(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Absence supprimée' });
        this.loadAbsences();
      },
      error: (error) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error?.message || 'Impossible de supprimer l’absence' })
    });
  }
}