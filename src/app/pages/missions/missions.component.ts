import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../../core/components/loading-spinner.component';
import { MissionCreateRequest, MissionDetailView, MissionService, MissionSummaryView, StatutMission, AffectationView } from '../../core/services/mission.service';
import { Direction, DirectionService } from '../../core/services/direction.service';
import { Agent, AgentService } from '../../core/services/agent.service';
import { Vehicule, VehiculeService } from '../../core/services/vehicule.service';

@Component({
  selector: 'app-missions',
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
    TagModule,
    ToastModule,
    LoadingSpinnerComponent
  ],
  providers: [MessageService],
  template: `
    <p-toast></p-toast>
    <app-loading-spinner [isLoading]="loading" message="Chargement des missions..."></app-loading-spinner>

    <div class="missions-page" [@fadeIn]>
      <div class="header">
        <div>
          <h2>🎯 Gestion des Missions</h2>
          <p>Liste, détail et soumission des missions du personnel.</p>
        </div>
        <p-button label="+ Nouvelle mission" icon="pi pi-plus" (click)="openCreateDialog()" severity="primary"></p-button>
      </div>

      <div class="card filters" [@slideDown]>
        <h3 style="margin-top: 0;">Filtres de recherche</h3>
        <div class="grid">
          <div>
            <label>Statut</label>
            <p-select [options]="statusOptions" optionLabel="label" optionValue="value" [(ngModel)]="filters.statut" placeholder="Tous" [showClear]="true"></p-select>
          </div>
          <div>
            <label>Direction</label>
            <p-select [options]="directions" optionLabel="nomDirection" optionValue="idDirection" [(ngModel)]="filters.idDirection" placeholder="Toutes" [showClear]="true"></p-select>
          </div>
          <div>
            <label>Date début</label>
            <p-datepicker [(ngModel)]="filters.dateDebut" [showIcon]="true"></p-datepicker>
          </div>
          <div>
            <label>Date fin</label>
            <p-datepicker [(ngModel)]="filters.dateFin" [showIcon]="true"></p-datepicker>
          </div>
        </div>
        <div class="actions">
          <p-button label="🔍 Rechercher" icon="pi pi-search" (click)="loadMissions()"></p-button>
          <p-button label="Réinitialiser" severity="secondary" outlined (click)="resetFilters()"></p-button>
        </div>
      </div>

      <p-table [value]="missions" [loading]="loading" [paginator]="true" [rows]="10" responsiveLayout="scroll" styleClass="p-datatable-striped card" [tableStyle]="{ 'min-width': '100%' }">
        <ng-template pTemplate="header">
          <tr>
            <th pSortableColumn="objetMission">Objet <p-sortIcon field="objetMission"></p-sortIcon></th>
            <th pSortableColumn="lieu">Lieu <p-sortIcon field="lieu"></p-sortIcon></th>
            <th pSortableColumn="dateDebut">Début <p-sortIcon field="dateDebut"></p-sortIcon></th>
            <th pSortableColumn="dateFin">Fin <p-sortIcon field="dateFin"></p-sortIcon></th>
            <th>Direction</th>
            <th>Statut</th>
            <th style="width: 220px">Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-mission>
          <tr class="mission-row">
            <td>{{ mission.objetMission }}</td>
            <td><span class="location-badge">📍 {{ mission.lieu }}</span></td>
            <td><span class="date-badge">{{ mission.dateDebut | date:'dd/MM/yyyy' }}</span></td>
            <td><span class="date-badge">{{ mission.dateFin | date:'dd/MM/yyyy' }}</span></td>
            <td>{{ mission.nomDirection }}</td>
            <td><p-tag [value]="mission.statut" [severity]="getStatusSeverity(mission.statut)"></p-tag></td>
            <td class="row-actions">
              <p-button icon="pi pi-eye" [rounded]="true" [text]="true" severity="info" pTooltip="Voir détails" tooltipPosition="top" (click)="openDetail(mission.idMission)"></p-button>
              <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="secondary" pTooltip="Modifier" tooltipPosition="top" (click)="openEditDialog(mission)"></p-button>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr><td colspan="7" class="empty">📭 Aucune mission trouvée</td></tr>
        </ng-template>
      </p-table>
    </div>

    <p-dialog [(visible)]="showDialog" [modal]="true" [style]="{ width: '700px' }" [header]="isEdit ? '✏️ Modifier mission' : '✨ Nouvelle mission'" (onHide)="closeDialog()" [maximizable]="true">
      <div class="dialog-grid">
        <div>
          <label>Objet de la mission</label>
          <input pInputText [(ngModel)]="form.objetMission" class="w-full" placeholder="Ex: Inspection site" />
        </div>
        <div>
          <label>Lieu</label>
          <input pInputText [(ngModel)]="form.lieu" class="w-full" placeholder="Ex: Paris" />
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
          <label>Direction</label>
          <p-select [options]="directions" optionLabel="nomDirection" optionValue="idDirection" [(ngModel)]="form.idDirection" placeholder="Sélectionner"></p-select>
        </div>
      </div>
      <ng-template pTemplate="footer">
        <div class="dialog-actions">
          <p-button label="Annuler" severity="secondary" outlined (click)="closeDialog()"></p-button>
          <p-button [label]="isEdit ? 'Mettre à jour' : 'Soumettre'" (click)="saveMission()" [loading]="saving" severity="success"></p-button>
        </div>
      </ng-template>
    </p-dialog>

    <p-dialog [(visible)]="showDetail" [modal]="true" [style]="{ width: '800px' }" header="📋 Détail mission" (onHide)="selectedMission = null" [maximizable]="true">
      <ng-container *ngIf="selectedMission as mission">
        <div class="detail-card">
          <div><strong>Objet :</strong> {{ mission.objetMission }}</div>
          <div><strong>Lieu :</strong> 📍 {{ mission.lieu }}</div>
          <div><strong>Dates :</strong> {{ mission.dateDebut | date:'dd/MM/yyyy' }} → {{ mission.dateFin | date:'dd/MM/yyyy' }}</div>
          <div><strong>Direction :</strong> {{ mission.nomDirection }}</div>
          <div><strong>Statut :</strong> <p-tag [value]="mission.statut" [severity]="getStatusSeverity(mission.statut)"></p-tag></div>
          <div *ngIf="mission.motifAnnulation"><strong>Motif annulation :</strong> {{ mission.motifAnnulation }}</div>
        </div>

        <h3>👥 Participants</h3>
        <p-table [value]="mission.participants" responsiveLayout="scroll" styleClass="p-datatable-sm">
          <ng-template pTemplate="header">
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Matricule</th>
              <th>Rôle</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-participant>
            <tr>
              <td>{{ participant.nom }}</td>
              <td>{{ participant.prenom }}</td>
              <td>{{ participant.matricule }}</td>
              <td>{{ participant.roleMission }}</td>
            </tr>
          </ng-template>
        </p-table>

        <div *ngIf="mission.affectation" class="detail-card mt-4">
          <h3>🚗 Affectation actuelle</h3>
          <div><strong>Chauffeur :</strong> {{ mission.affectation.prenomChauffeur }} {{ mission.affectation.nomChauffeur }}</div>
          <div><strong>Véhicule :</strong> {{ mission.affectation.marqueVehicule }} {{ mission.affectation.modeleVehicule }} - {{ mission.affectation.immatriculationVehicule }}</div>
          <div class="dialog-actions justify-start">
            <p-button label="Retirer l'affectation" icon="pi pi-times" severity="danger" outlined (click)="removeAffectation(mission.idMission)"></p-button>
          </div>
        </div>

        <div class="detail-card mt-4">
          <h3>🔗 Affecter chauffeur et véhicule</h3>
          <div class="affectation-grid">
            <div>
              <label>Chauffeur</label>
              <p-select
                [options]="chauffeurs"
                optionLabel="displayName"
                optionValue="idAgent"
                [(ngModel)]="affectationForm.idChauffeur"
                placeholder="Sélectionner un chauffeur"
                [showClear]="true"
                (onChange)="onChauffeurChange($event.value)">
              </p-select>
            </div>
            <div>
              <label>Véhicule disponible</label>
              <p-select
                [options]="vehiculesDisponibles"
                optionLabel="displayName"
                optionValue="idVehicule"
                [(ngModel)]="affectationForm.idVehicule"
                placeholder="Sélectionner un véhicule"
                [showClear]="true">
              </p-select>
            </div>
          </div>

          <div *ngIf="chauffeurAffectations.length" class="affectation-hints">
            <div class="hint-title">⚠️ Missions déjà affectées à ce chauffeur</div>
            <ul>
              <li *ngFor="let affectation of chauffeurAffectations">
                {{ affectation.nomChauffeur }} {{ affectation.prenomChauffeur }} — {{ affectation.immatriculationVehicule }}
              </li>
            </ul>
          </div>

          <div class="dialog-actions justify-start">
            <p-button label="✅ Affecter" icon="pi pi-check" (click)="assignResources(mission.idMission)" [loading]="assigning" severity="success"></p-button>
          </div>
        </div>

        <div class="dialog-actions mt-4">
          <p-button label="📥 Télécharger la fiche PDF" icon="pi pi-download" severity="secondary" outlined (click)="downloadFiche(mission.idMission)"></p-button>
        </div>
      </ng-container>
    </p-dialog>
  `,
  styles: [`
    .missions-page { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; animation: slideUp 0.6s ease-out; }
    .header { display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; margin-bottom:1rem; }
    .header h2 { margin:0; font-size: 1.875rem; background: linear-gradient(135deg, #0D5C3F 0%, #8B0000 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .header p { margin:.25rem 0 0; color: var(--text-color-secondary, #666); }
    .card { background: var(--surface-card, #fff); border-radius: 1rem; padding: 1.5rem; box-shadow: 0 8px 30px rgba(0,0,0,.06); border: 1px solid rgba(226, 232, 240, 0.5); }
    .card h3 { margin-top: 0; color: #1e293b; }
    .filters .grid, .dialog-grid { display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
    .filters label, .dialog-grid label { display:block; margin-bottom:.4rem; font-weight:600; color: #1e293b; }
    .actions, .dialog-actions { display:flex; gap:.75rem; justify-content:flex-end; margin-top:1rem; }
    .row-actions { display:flex; gap:.25rem; }
    .empty { text-align:center; padding: 2rem; color: #64748b; font-size: 1.1rem; }
    .detail-card { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: .75rem; padding: 1rem; display:grid; gap:.5rem; }
    .detail-card div { padding: 0.4rem 0; }
    .detail-card strong { color: #1e293b; }
    .full { grid-column: 1 / -1; }
    .mt-4 { margin-top: 1.5rem; }
    .affectation-grid { display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; margin-top: .5rem; }
    .affectation-grid label { display:block; margin-bottom:.4rem; font-weight:600; color: #1e293b; }
    .affectation-hints { margin-top: .75rem; padding: .85rem 1rem; border-radius: .75rem; background: #fff7ed; border: 1px solid #fed7aa; }
    .hint-title { font-weight: 700; margin-bottom: .4rem; color: #9a3412; }
    .affectation-hints ul { margin: 0; padding-left: 1.25rem; }
    .affectation-hints li { color: #92400e; }
    .justify-start { justify-content:flex-start; }
    .location-badge { background: #e8f5e9; color: #0D5C3F; padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.875rem; }
    .date-badge { background: #fff8f0; color: #8B0000; padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.875rem; }
    .mission-row { transition: all 0.2s ease; }
    .mission-row:hover { background-color: #f8fafc; }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .affectation-grid { grid-template-columns: 1fr; }
      .filters .grid { grid-template-columns: 1fr; }
      .header { flex-direction: column; }
    }
  `]
})
export class MissionsComponent implements OnInit {
  missions: MissionSummaryView[] = [];
  directions: Direction[] = [];
  loading = false;
  saving = false;
  showDialog = false;
  showDetail = false;
  isEdit = false;
  selectedMission: MissionDetailView | null = null;
  editingMissionId: number | null = null;
  chauffeurs: Array<Agent & { displayName: string }> = [];
  vehiculesDisponibles: Array<Vehicule & { displayName: string }> = [];
  chauffeurAffectations: AffectationView[] = [];
  assigning = false;
  filters = {
    statut: null as StatutMission | null,
    idDirection: null as number | null,
    dateDebut: null as Date | null,
    dateFin: null as Date | null
  };
  form = {
    objetMission: '',
    lieu: '',
    dateDebut: null as Date | null,
    dateFin: null as Date | null,
    idDirection: null as number | null
  };

  affectationForm = {
    idChauffeur: null as number | null,
    idVehicule: null as number | null
  };

  statusOptions = [
    { label: 'Prévue', value: StatutMission.PREVUE },
    { label: 'Initiée', value: StatutMission.INITIEE },
    { label: 'Annulée', value: StatutMission.ANNULEE },
    { label: 'Clôturée', value: StatutMission.CLOTUREE }
  ];

  constructor(
    private readonly missionService: MissionService,
    private readonly directionService: DirectionService,
    private readonly agentService: AgentService,
    private readonly vehiculeService: VehiculeService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadDirections();
    this.loadMissions();
  }

  loadDirections(): void {
    this.directionService.getAllDirections().subscribe({
      next: (data) => (this.directions = data),
      error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les directions' })
    });
  }

  loadMissions(): void {
    this.loading = true;
    this.missionService.getAllMissions({
      statut: this.filters.statut ?? undefined,
      idDirection: this.filters.idDirection ?? undefined,
      dateDebut: this.filters.dateDebut ?? undefined,
      dateFin: this.filters.dateFin ?? undefined
    }).subscribe({
      next: (data) => {
        this.missions = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les missions' });
      }
    });
  }

  resetFilters(): void {
    this.filters = { statut: null, idDirection: null, dateDebut: null, dateFin: null };
    this.loadMissions();
  }

  openCreateDialog(): void {
    this.isEdit = false;
    this.editingMissionId = null;
    this.form = { objetMission: '', lieu: '', dateDebut: null, dateFin: null, idDirection: null };
    this.showDialog = true;
  }

  openEditDialog(mission: MissionSummaryView): void {
    this.isEdit = true;
    this.editingMissionId = mission.idMission;
    this.form = {
      objetMission: mission.objetMission,
      lieu: mission.lieu,
      dateDebut: new Date(mission.dateDebut),
      dateFin: new Date(mission.dateFin),
      idDirection: mission.idDirection
    };
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  saveMission(): void {
    if (!this.form.objetMission || !this.form.lieu || !this.form.dateDebut || !this.form.dateFin || !this.form.idDirection) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Tous les champs sont obligatoires' });
      return;
    }

    const payload: MissionCreateRequest = {
      objetMission: this.form.objetMission,
      lieu: this.form.lieu,
      dateDebut: this.formatDate(this.form.dateDebut),
      dateFin: this.formatDate(this.form.dateFin),
      idDirection: this.form.idDirection
    };

    this.saving = true;
    const request$ = this.isEdit && this.editingMissionId
      ? this.missionService.updateMission(this.editingMissionId, payload)
      : this.missionService.createMission(payload);

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.showDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: this.isEdit ? 'Mission mise à jour' : 'Mission soumise' });
        this.loadMissions();
      },
      error: (error) => {
        this.saving = false;
        const detail = error?.status === 403
          ? "Accès refusé : vous n'avez pas le rôle requis pour soumettre une mission."
          : error.error?.message || 'Impossible d’enregistrer la mission';
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail });
      }
    });
  }

  openDetail(idMission: number): void {
    this.missionService.getMissionById(idMission).subscribe({
      next: (data) => {
        this.selectedMission = data;
        this.prefillAffectationForm(data);
        this.loadAffectationData();
        this.showDetail = true;
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger le détail de la mission' })
    });
  }

  onChauffeurChange(idChauffeur: number | null): void {
    this.affectationForm.idChauffeur = idChauffeur;
    if (!idChauffeur) {
      this.chauffeurAffectations = [];
      return;
    }

    this.missionService.getAffectationsByChauffeur(idChauffeur).subscribe({
      next: (data) => (this.chauffeurAffectations = data),
      error: () => {
        this.chauffeurAffectations = [];
        this.messageService.add({ severity: 'warn', summary: 'Information', detail: 'Impossible de charger les missions du chauffeur' });
      }
    });
  }

  assignResources(idMission: number): void {
    if (!this.affectationForm.idChauffeur || !this.affectationForm.idVehicule) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Chauffeur et véhicule sont obligatoires' });
      return;
    }

    this.assigning = true;
    this.missionService.assignResources(idMission, {
      idChauffeur: this.affectationForm.idChauffeur,
      idVehicule: this.affectationForm.idVehicule
    }).subscribe({
      next: () => {
        this.assigning = false;
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Affectation enregistrée' });
        this.refreshMissionDetail(idMission);
      },
      error: (error) => {
        this.assigning = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: error.error?.message || 'Impossible d’enregistrer l’affectation'
        });
      }
    });
  }

  removeAffectation(idMission: number): void {
    this.missionService.removeAffectation(idMission).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Affectation supprimée' });
        this.refreshMissionDetail(idMission);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: error.error?.message || 'Impossible de supprimer l’affectation' });
      }
    });
  }
  
  downloadFiche(idMission: number): void {
    this.missionService.downloadMissionFiche(idMission).subscribe({
      next: (blob) => {
        const url = globalThis.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `fiche-mission-${idMission}.pdf`;
        link.click();
        globalThis.URL.revokeObjectURL(url);
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de télécharger la fiche PDF' })
    });
  }

  private loadAffectationData(): void {
    this.agentService.getAllChauffeurs().subscribe({
      next: (data) => {
        this.chauffeurs = data.map((agent) => ({
          ...agent,
          displayName: `${agent.prenom} ${agent.nom} (${agent.matricule})`
        }));
      }
    });

    this.vehiculeService.getDisponibleVehicules().subscribe({
      next: (data) => {
        const mapped = data.map((vehicule) => ({
          ...vehicule,
          displayName: `${vehicule.marque} ${vehicule.modele} (${vehicule.immatriculation})`
        }));

        if (this.selectedMission?.affectation) {
          const affectation = this.selectedMission.affectation;
          const currentVehicule: Vehicule & { displayName: string } = {
            idVehicule: affectation.idVehicule,
            immatriculation: affectation.immatriculationVehicule,
            marque: affectation.marqueVehicule,
            modele: affectation.modeleVehicule,
            typeVehicule: '',
            capacite: undefined,
            statut: undefined as any,
            dateAcquisition: undefined,
            actif: true,
            displayName: `${affectation.marqueVehicule} ${affectation.modeleVehicule} (${affectation.immatriculationVehicule})`
          };

          const hasCurrentVehicule = mapped.some((v) => v.idVehicule === currentVehicule.idVehicule);
          this.vehiculesDisponibles = hasCurrentVehicule ? mapped : [currentVehicule, ...mapped];
        } else {
          this.vehiculesDisponibles = mapped;
        }
      }
    });
  }

  private prefillAffectationForm(mission: MissionDetailView): void {
    this.affectationForm = {
      idChauffeur: mission.affectation?.idChauffeur ?? null,
      idVehicule: mission.affectation?.idVehicule ?? null
    };

    if (mission.affectation?.idChauffeur) {
      this.onChauffeurChange(mission.affectation.idChauffeur);
    } else {
      this.chauffeurAffectations = [];
    }
  }

  private refreshMissionDetail(idMission: number): void {
    this.missionService.getMissionById(idMission).subscribe({
      next: (data) => {
        this.selectedMission = data;
        this.prefillAffectationForm(data);
        this.loadAffectationData();
        this.loadMissions();
      }
    });
  }

  getStatusSeverity(status: StatutMission): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | null | undefined {
    switch (status) {
      case StatutMission.PREVUE:
        return 'warn';
      case StatutMission.INITIEE:
        return 'info';
      case StatutMission.ANNULEE:
        return 'danger';
      case StatutMission.CLOTUREE:
        return 'success';
      default:
        return 'secondary';
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
