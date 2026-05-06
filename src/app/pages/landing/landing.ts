import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TopbarWidget } from './components/topbarwidget.component';
import { FooterWidget } from './components/footerwidget';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [CommonModule, RouterModule, TopbarWidget, FooterWidget, RippleModule, ButtonModule, CardModule],
    styles: [`
        :host ::ng-deep {
            .animated-bg {
                background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                background-size: 400% 400%;
                animation: gradientShift 15s ease infinite;
            }

            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            .hero-section {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
            }

            .floating-shapes {
                position: absolute;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }

            .shape {
                position: absolute;
                opacity: 0.1;
                border-radius: 50%;
            }

            .shape1 {
                width: 300px;
                height: 300px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                top: -150px;
                left: -150px;
                animation: float1 8s ease-in-out infinite;
            }

            .shape2 {
                width: 250px;
                height: 250px;
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                bottom: -125px;
                right: -125px;
                animation: float2 10s ease-in-out infinite;
            }

            .shape3 {
                width: 200px;
                height: 200px;
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                top: 50%;
                right: 10%;
                animation: float3 12s ease-in-out infinite;
            }

            @keyframes float1 {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                50% { transform: translate(30px, -30px) rotate(180deg); }
            }

            @keyframes float2 {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                50% { transform: translate(-40px, 40px) rotate(180deg); }
            }

            @keyframes float3 {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(-20px, 20px); }
            }

            .hero-content {
                position: relative;
                z-index: 10;
                text-align: center;
                animation: slideUp 1.2s ease-out;
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(40px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .hero-title {
                font-size: 4rem;
                font-weight: 800;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: fadeInTitle 1.5s ease-out;
                margin-bottom: 1.5rem;
            }

            @keyframes fadeInTitle {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .hero-subtitle {
                font-size: 1.25rem;
                color: #64748b;
                max-width: 600px;
                margin: 0 auto 3rem;
                animation: fadeInSubtitle 1.8s ease-out;
            }

            @keyframes fadeInSubtitle {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            .cta-buttons {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
                animation: fadeInButtons 2s ease-out;
            }

            @keyframes fadeInButtons {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }

            .features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 2rem;
                margin-top: 4rem;
                animation: fadeInGrid 2.2s ease-out;
            }

            @keyframes fadeInGrid {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            .feature-card {
                padding: 2rem;
                border-radius: 1rem;
                background: white;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border: 1px solid rgba(226, 232, 240, 0.5);
            }

            .feature-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
                border-color: #667eea;
            }

            .feature-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                animation: pulseIcon 2s ease-in-out infinite;
            }

            @keyframes pulseIcon {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }

            .feature-title {
                font-size: 1.25rem;
                font-weight: 700;
                color: #1e293b;
                margin-bottom: 0.75rem;
            }

            .feature-description {
                color: #64748b;
                line-height: 1.6;
            }

            .stats-section {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
                margin: 4rem 0;
                text-align: center;
            }

            .stat-item {
                padding: 2rem;
            }

            .stat-number {
                font-size: 3rem;
                font-weight: 800;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .stat-label {
                color: #64748b;
                margin-top: 0.5rem;
                font-size: 0.95rem;
            }

            .section {
                padding: 5rem 2rem;
                max-width: 1200px;
                margin: 0 auto;
            }

            .gradient-button {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 0.75rem 2rem;
                border: none;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                display: inline-block;
            }

            .gradient-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
            }

            .gradient-button-secondary {
                background: white;
                color: #667eea;
                padding: 0.75rem 2rem;
                border: 2px solid #667eea;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                display: inline-block;
            }

            .gradient-button-secondary:hover {
                background: #f0f4ff;
                transform: translateY(-3px);
            }

            .dark .feature-card {
                background: #1e293b;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                border-color: rgba(51, 65, 85, 0.5);
            }

            .dark .hero-subtitle {
                color: #cbd5e1;
            }

            .dark .feature-title {
                color: #f1f5f9;
            }

            .dark .feature-description {
                color: #cbd5e1;
            }

            .dark .stat-label {
                color: #cbd5e1;
            }
        }
    `],
    template: `
        <div class="bg-white dark:bg-slate-900 min-h-screen">
            <!-- Header -->
            <topbar-widget class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm" />

            <!-- Hero Section -->
            <div class="hero-section animated-bg">
                <div class="floating-shapes">
                    <div class="shape shape1"></div>
                    <div class="shape shape2"></div>
                    <div class="shape shape3"></div>
                </div>
                <div class="hero-content px-6">
                    <h1 class="hero-title">Gestion Intelligente des Missions</h1>
                    <p class="hero-subtitle">
                        Optimisez la planification et le suivi de vos missions avec un système complet et intuitif
                    </p>
                    <div class="cta-buttons">
                        <button class="gradient-button" routerLink="/auth/login" pRipple>
                            Démarrer
                        </button>
                        <button class="gradient-button-secondary" (click)="scrollToFeatures()" pRipple>
                            En savoir plus
                        </button>
                    </div>
                </div>
            </div>

            <!-- Stats Section -->
            <div class="section bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
                <div class="stats-section">
                    <div class="stat-item" *ngFor="let stat of stats">
                        <div class="stat-number">{{ stat.number }}</div>
                        <div class="stat-label">{{ stat.label }}</div>
                    </div>
                </div>
            </div>

            <!-- Features Section -->
            <div class="section" id="featuresSection">
                <h2 class="text-4xl font-bold text-center mb-2 dark:text-white">Fonctionnalités Principales</h2>
                <p class="text-center text-gray-600 dark:text-gray-400 mb-12">Découvrez les outils puissants conçus pour simplifier votre travail</p>
                <div class="features-grid">
                    <div class="feature-card" *ngFor="let feature of features">
                        <div class="feature-icon">{{ feature.icon }}</div>
                        <h3 class="feature-title">{{ feature.title }}</h3>
                        <p class="feature-description">{{ feature.description }}</p>
                    </div>
                </div>
            </div>

            <!-- Call to Action Section -->
            <div class="section bg-gradient-to-r from-purple-100 to-blue-100 dark:from-slate-800 dark:to-slate-700 text-center rounded-2xl">
                <h2 class="text-3xl font-bold mb-4 dark:text-white">Prêt à commencer ?</h2>
                <p class="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    Rejoignez les entreprises qui font confiance à notre plateforme pour gérer leurs missions efficacement.
                </p>
                <button class="gradient-button text-lg" routerLink="/auth/login" pRipple>
                    Se connecter maintenant
                </button>
            </div>

            <!-- Footer -->
            <footer-widget />
        </div>
    `
})
export class Landing {
    featuresSection: any;

    stats = [
        { number: '500+', label: 'Missions gérées' },
        { number: '98%', label: 'Taux de satisfaction' },
        { number: '24/7', label: 'Support disponible' },
        { number: '50+', label: 'Entreprises partenaires' }
    ];

    features = [
        {
            icon: '📋',
            title: 'Gestion des Missions',
            description: 'Créez, planifiez et suivez vos missions en temps réel avec un système intuitif et performant.'
        },
        {
            icon: '🚗',
            title: 'Gestion des Véhicules',
            description: 'Inventoriez et maintenez vos véhicules. Suivez leur disponibilité et leur entretien.'
        },
        {
            icon: '👥',
            title: 'Gestion des Agents',
            description: 'Gérez vos équipes, leurs compétences et leurs affectations aux missions.'
        },
        {
            icon: '📊',
            title: 'Tableaux de Bord',
            description: 'Visualisez les statistiques clés et prenez des décisions basées sur les données.'
        },
        {
            icon: '🗓️',
            title: 'Gestion des Absences',
            description: 'Suivez les congés et absences de votre équipe pour une meilleure planification.'
        },
        {
            icon: '🔒',
            title: 'Sécurité Garantie',
            description: 'Authentification sécurisée et gestion des permissions pour protéger vos données.'
        }
    ];

    scrollToFeatures() {
        const element = document.querySelector('#featuresSection') as HTMLElement;
        element?.scrollIntoView({ behavior: 'smooth' });
    }
}
