import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <div class="flex flex-col gap-6">
            <div class="carfo-hero rounded-3xl p-8 md:p-10">
                <div class="relative z-10 max-w-3xl">
                    <span class="carfo-chip carfo-chip--light mb-4">CARFO · Missions</span>
                    <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-4">Pilotage des missions, des agents et des véhicules</h1>
                    <p class="text-white/85 text-base md:text-lg max-w-2xl">
                        Une interface centrée sur les opérations de mission, conçue pour s'adapter aux couleurs du logo CARFO dès que tu l'ajoutes.
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <a routerLink="/missions" class="carfo-card rounded-2xl p-5 hover:-translate-y-0.5 transition">
                    <div class="carfo-chip carfo-chip--primary">Missions</div>
                    <div class="text-2xl font-semibold mt-4">Liste & suivi</div>
                    <p class="text-sm text-surface-600 dark:text-surface-300 mt-2">Consulter les missions en cours et leur état.</p>
                </a>
                <a routerLink="/missions/nouvelle" class="carfo-card rounded-2xl p-5 hover:-translate-y-0.5 transition">
                    <div class="carfo-chip carfo-chip--primary">Nouvelle mission</div>
                    <div class="text-2xl font-semibold mt-4">Créer une demande</div>
                    <p class="text-sm text-surface-600 dark:text-surface-300 mt-2">Préparer une nouvelle mission à soumettre.</p>
                </a>
                <a routerLink="/agents" class="carfo-card rounded-2xl p-5 hover:-translate-y-0.5 transition">
                    <div class="carfo-chip carfo-chip--primary">Agents</div>
                    <div class="text-2xl font-semibold mt-4">Personnel mission</div>
                    <p class="text-sm text-surface-600 dark:text-surface-300 mt-2">Gérer les agents et leurs profils mission.</p>
                </a>
                <a routerLink="/vehicules" class="carfo-card rounded-2xl p-5 hover:-translate-y-0.5 transition">
                    <div class="carfo-chip carfo-chip--primary">Véhicules</div>
                    <div class="text-2xl font-semibold mt-4">Disponibilité flotte</div>
                    <p class="text-sm text-surface-600 dark:text-surface-300 mt-2">Suivre les véhicules disponibles pour l'affectation.</p>
                </a>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div class="carfo-card rounded-2xl p-5">
                    <div class="text-surface-500 text-sm">Absences</div>
                    <div class="text-xl font-semibold mt-2">Vérifier les disponibilités</div>
                    <p class="text-surface-600 dark:text-surface-300 mt-3">Consulter les absences avant toute affectation de mission.</p>
                </div>
                <div class="carfo-card rounded-2xl p-5">
                    <div class="text-surface-500 text-sm">Directions</div>
                    <div class="text-xl font-semibold mt-2">Structurer les demandes</div>
                    <p class="text-surface-600 dark:text-surface-300 mt-3">Organiser les missions selon les directions et les services.</p>
                </div>
                <div class="carfo-card rounded-2xl p-5">
                    <div class="text-surface-500 text-sm">Suivi</div>
                    <div class="text-xl font-semibold mt-2">Validation et affectation</div>
                    <p class="text-surface-600 dark:text-surface-300 mt-3">Centraliser le cycle de vie complet d'une mission.</p>
                </div>
            </div>
        </div>
    `
})
export class Dashboard {}
