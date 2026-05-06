import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LoadingSpinnerComponent } from '../../core/components/loading-spinner.component';
import { AgentService, Agent, AgentUpdateRequest } from '../../core/services/agent.service';
import { DirectionService, Direction } from '../../core/services/direction.service';

@Component({
  selector: 'app-agents',
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
    CheckboxModule,
    TagModule,
    LoadingSpinnerComponent
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <app-loading-spinner [isLoading]="loading" message="Chargement des agents..."></app-loading-spinner>
    <div class="carfo-container" [@fadeIn]>
      <div class="header-section">
        <h2>👥 Gestion des Agents</h2>
        <p-button 
          icon="pi pi-plus" 
          label="+ Nouvel Agent" 
          (click)="showAddDialog()"
          severity="success">
        </p-button>
      </div>

      <p-table 
        [value]="agents" 
        [loading]="loading"
        [paginator]="true" 
        [rows]="10"
        responsiveLayout="scroll"
        styleClass="p-datatable-striped">
        <ng-template pTemplate="header">
          <tr>
            <th pSortableColumn="nom">Nom <p-sortIcon field="nom"></p-sortIcon></th>
            <th pSortableColumn="prenom">Prénom(s) <p-sortIcon field="prenom"></p-sortIcon></th>
            <th pSortableColumn="email">Email</th>
            <th pSortableColumn="role">Rôle</th>
            <th pSortableColumn="estChauffeur">Chauffeur</th>
            <th pSortableColumn="actif">Actif</th>
            <th style="width: 200px">Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-agent>
          <tr [ngClass]="{'opacity-60': !agent.actif}">
            <td>{{ agent.nom }}</td>
            <td>{{ agent.prenom }}</td>
            <td>{{ agent.email }}</td>
            <td>
              <p-tag 
                [value]="agent.role" 
                [severity]="getRoleSeverity(agent.role)">
              </p-tag>
            </td>
            <td>
              <p-tag 
                *ngIf="agent.estChauffeur"
                icon="pi pi-car"
                value="Chauffeur"
                severity="info">
              </p-tag>
              <span *ngIf="!agent.estChauffeur" class="text-gray-400">-</span>
            </td>
            <td>
              <p-tag 
                [value]="agent.actif ? 'Oui' : 'Non'" 
                [severity]="agent.actif ? 'success' : 'danger'">
              </p-tag>
            </td>
            <td>
              <p-button 
                icon="pi pi-pencil" 
                [rounded]="true" 
                [text]="true"
                severity="info"
                (click)="showEditDialog(agent)"
                pTooltip="Modifier"
                tooltipPosition="top">
              </p-button>
              <p-button 
                *ngIf="agent.actif"
                icon="pi pi-times" 
                [rounded]="true" 
                [text]="true"
                severity="danger"
                (click)="confirmDeactivate(agent)"
                pTooltip="Désactiver"
                tooltipPosition="top">
              </p-button>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="7" class="empty-message">📭 Aucun agent trouvé</td>
          </tr>
        </ng-template>
      </p-table>

      <p-dialog 
        [(visible)]="showDialog" 
        [header]="isEdit ? '✏️ Modifier Agent' : '✨ Nouvel Agent'"
        [modal]="true" 
        [style]="{width: '500px'}"
        [closeOnEscape]="true"
        [maximizable]="true"
        (onHide)="resetForm()">
        <form [formGroup]="agentForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="nom">Nom *</label>
            <input 
              pInputText 
              id="nom"
              formControlName="nom"
              type="text"
              class="w-full"
              placeholder="Nom de famille">
          </div>

          <div class="form-group">
            <label for="prenom">Prénom *</label>
            <input 
              pInputText 
              id="prenom"
              formControlName="prenom"
              type="text"
              class="w-full"
              placeholder="Prénom">
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input 
              pInputText 
              id="email"
              formControlName="email"
              type="email"
              class="w-full"
              placeholder="email@example.com">
          </div>

          <div class="form-group">
            <label for="matricule">Matricule *</label>
            <input 
              pInputText 
              id="matricule"
              formControlName="matricule"
              type="text"
              class="w-full"
              placeholder="MAT-001">
          </div>

          <div class="form-group">
            <label for="fonction">Fonction *</label>
            <input 
              pInputText 
              id="fonction"
              formControlName="fonction"
              type="text"
              class="w-full"
              placeholder="Responsable, Chauffeur">
          </div>

          <div class="form-group">
            <label for="telephone">Téléphone</label>
            <input 
              pInputText 
              id="telephone"
              formControlName="telephone"
              type="tel"
              class="w-full"
              placeholder="06 XX XX XX XX">
          </div>

          <div class="form-group">
            <label for="role">Rôle *</label>
            <select formControlName="role" class="form-select">
              <option value="">Sélectionner</option>
              <option value="ADMINISTRATEUR">Administrateur</option>
              <option value="CHARGE_ETUDE">Chargé Étude</option>
              <option value="AGENT">Agent</option>
            </select>
          </div>

          <div class="form-group">
            <label for="idDirection">Direction *</label>
            <select formControlName="idDirection" class="form-select">
              <option value="">Sélectionner</option>
              <option *ngFor="let dir of directions" [value]="dir.idDirection">{{ dir.nomDirection }}</option>
            </select>
          </div>

          <div class="form-checkboxes">
            <p-checkbox 
              [(ngModel)]="isChauffeur"
              [ngModelOptions]="{standalone: true}"
              (onChange)="agentForm.get('estChauffeur')?.setValue($event.checked)"
              inputId="estChauffeur"
              label="Chauffeur">
            </p-checkbox>
            <p-checkbox 
              [(ngModel)]="isActif"
              [ngModelOptions]="{standalone: true}"
              (onChange)="agentForm.get('actif')?.setValue($event.checked)"
              inputId="actif"
              label="Actif">
            </p-checkbox>
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
              [disabled]="agentForm.invalid">
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
      max-width: 1400px;
      margin: 0 auto;
    }

    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      animation: slideUp 0.6s ease-out;
    }

    .header-section h2 {
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 1.75rem;
      font-weight: 800;
    }

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

    .empty-message {
      text-align: center;
      padding: 2rem;
      color: #64748b;
      font-size: 1.1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }

    .form-group label {
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    .form-group input,
    .form-select {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.95rem;
    }

    .form-checkboxes {
      display: flex;
      gap: 2rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .opacity-60 {
      opacity: 0.6;
    }
  `]
})
export class AgentsComponent implements OnInit {
  agents: Agent[] = [];
  directions: Direction[] = [];
  showDialog = false;
  isEdit = false;
  loading = false;
  isChauffeur = false;
  isActif = true;
  agentForm: FormGroup;
  selectedAgent: Agent | null = null;

  constructor(
    private readonly agentService: AgentService,
    private readonly directionService: DirectionService,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {
    this.agentForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      matricule: ['', [Validators.required]],
      fonction: ['', [Validators.required]],
      telephone: [''],
      role: ['AGENT', Validators.required],
      idDirection: [null, Validators.required],
      estChauffeur: [false],
      actif: [true]
    });
  }

  ngOnInit(): void {
    this.loadDirections();
    this.loadAgents();
  }

  loadAgents(): void {
    this.loading = true;
    this.agentService.getAllAgents().subscribe({
      next: (data: Agent[]) => {
        this.agents = data;
        this.loading = false;
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les agents' });
        this.loading = false;
      }
    });
  }

  loadDirections(): void {
    this.directionService.getAllDirections().subscribe({
      next: (data: Direction[]) => {
        this.directions = data;
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les directions' });
      }
    });
  }

  showAddDialog(): void {
    this.isEdit = false;
    this.selectedAgent = null;
    this.isChauffeur = false;
    this.isActif = true;
    this.agentForm.reset({ role: 'AGENT', actif: true, estChauffeur: false });
    this.showDialog = true;
  }

  showEditDialog(agent: Agent): void {
    this.isEdit = true;
    this.selectedAgent = agent;
    this.isChauffeur = agent.estChauffeur;
    this.isActif = agent.actif;
    this.agentForm.patchValue({
      nom: agent.nom,
      prenom: agent.prenom,
      email: agent.email,
      matricule: agent.matricule,
      fonction: agent.fonction,
      telephone: agent.telephone,
      role: agent.role,
      idDirection: agent.direction.idDirection,
      estChauffeur: agent.estChauffeur,
      actif: agent.actif
    });
    this.showDialog = true;
  }

  onSubmit(): void {
    if (this.agentForm.invalid) return;

    this.loading = true;
    const request: AgentUpdateRequest = this.agentForm.value;

    if (this.isEdit && this.selectedAgent?.id) {
      this.agentService.updateAgent(this.selectedAgent.id, request).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Agent mis à jour' });
          this.showDialog = false;
          this.loadAgents();
          this.loading = false;
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour' });
          this.loading = false;
        }
      });
    }
  }

  confirmDeactivate(agent: Agent): void {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir désactiver "${agent.nom} ${agent.prenom}"?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (agent.id) {
          this.loading = true;
          this.agentService.deactivateAgent(agent.id).subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Agent désactivé' });
              this.loadAgents();
              this.loading = false;
            },
            error: (error: any) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la désactivation' });
              this.loading = false;
            }
          });
        }
      }
    });
  }

  getRoleSeverity(role: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | null | undefined {
    switch (role) {
      case 'ADMINISTRATEUR':
        return 'danger';
      case 'CHARGE_ETUDE':
        return 'warn';
      default:
        return 'info';
    }
  }

  resetForm(): void {
    this.agentForm.reset();
    this.selectedAgent = null;
    this.isEdit = false;
  }
}
