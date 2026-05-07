import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-landing-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  template: `
    <div class="landing-page">
      <header class="hero-shell" id="home">
        <div class="hero-overlay"></div>

        <div class="topbar">
          <a class="brand" routerLink="/landing" aria-label="CARFO accueil">
            <span class="brand-logo">
              <img src="assets/logo-carfo.png" alt="CARFO" />
            </span>
            <span class="brand-copy">
              <span class="brand-name">CARFO</span>
              <span class="brand-subtitle">Gestion intégrée des missions</span>
            </span>
          </a>

          <nav class="nav-links" aria-label="Navigation principale">
            <a href="#home">Accueil</a>
            <a href="#stats">Aperçu</a>
            <a href="#modules">Modules</a>
            <a href="#support">Support</a>
          </nav>

          <button pButton type="button" class="topbar-cta" routerLink="/login" label="Connexion"></button>
        </div>

        <div class="hero-section">
          <div class="hero-grid">
            <div class="hero-copy">
              <div class="eyebrow">🟢 CARFO · Plateforme de pilotage</div>
              <h1>Une interface moderne pour gérer les missions avec clarté</h1>
              <p>
                Suivez les missions, les agents, les véhicules et les absences dans une expérience pensée pour la lecture rapide,
                l’accès direct aux actions et une organisation visuelle plus ergonomique.
              </p>

              <div class="hero-actions">
                <button pButton type="button" class="primary-button" routerLink="/login" label="Se connecter"></button>
                <button pButton type="button" class="secondary-button" (click)="scrollToSection('modules')" label="Découvrir les modules"></button>
              </div>

              <div class="hero-tags">
                <span *ngFor="let tag of heroTags">{{ tag }}</span>
              </div>
            </div>

            <aside class="hero-panel" aria-label="Aperçu du système">
              <div class="hero-panel__glass">
                <div class="panel-header">
                  <span class="panel-kicker">Vue d’ensemble</span>
                  <strong>Lisible, rapide, centralisé</strong>
                </div>

                <div class="panel-stats">
                  <article class="panel-stat" *ngFor="let stat of stats">
                    <span class="panel-stat__value">{{ stat.number }}</span>
                    <span class="panel-stat__label">{{ stat.label }}</span>
                  </article>
                </div>

                <div class="panel-signals">
                  <div class="signal-row" *ngFor="let signal of heroSignals">
                    <span class="signal-dot"></span>
                    <div>
                      <strong>{{ signal.title }}</strong>
                      <p>{{ signal.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div class="wave-bottom"></div>
      </header>

      <main>
        <section class="section-wrap" id="stats">
          <div class="section-title">
            <h2>Un aperçu utile dès l’arrivée</h2>
            <p>Des indicateurs simples pour comprendre immédiatement la structure fonctionnelle de CARFO.</p>
          </div>

          <div class="stats-grid">
            <article class="stat-card" *ngFor="let stat of stats">
              <div class="stat-value">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </article>
          </div>
        </section>

        <section class="section-wrap section-wrap--alt" id="modules">
          <div class="section-title">
            <h2>Modules organisés pour un usage quotidien</h2>
            <p>Une disposition plus moderne : un module principal mis en avant et une grille compacte pour accéder vite aux autres fonctions.</p>
          </div>

          <div class="modules-layout">
            <article class="featured-module">
              <div class="featured-module__top">
                <span class="featured-module__badge">Module central</span>
                <h3>Gestion des missions</h3>
                <p>
                  Créez, planifiez, affectez et suivez les missions dans un espace unique, avec les actions les plus utilisées toujours visibles.
                </p>
              </div>

              <ul class="featured-module__list">
                <li>Suivi clair des dates, lieux et statuts</li>
                <li>Affectation rapide des agents et véhicules</li>
                <li>Accès direct aux documents et détails</li>
              </ul>

              <div class="featured-module__footer">
                <span>Flux principal</span>
                <button pButton type="button" class="featured-button" routerLink="/missions" label="Ouvrir les missions"></button>
              </div>
            </article>

            <div class="modules-grid">
              <article class="module-card" *ngFor="let module of modules">
                <div class="module-card__head">
                  <div class="module-icon">{{ module.icon }}</div>
                  <span class="module-badge">{{ module.badge }}</span>
                </div>

                <h3>{{ module.title }}</h3>
                <p>{{ module.description }}</p>

                <ul class="module-points">
                  <li *ngFor="let point of module.points">{{ point }}</li>
                </ul>

                <div class="module-footer">
                  <span>{{ module.footer }}</span>
                  <a [routerLink]="module.route">Accéder</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section class="section-wrap" id="support">
          <div class="support-grid">
            <article class="support-card">
              <div class="section-title compact">
                <h2>Un parcours simple et rapide</h2>
                <p>Le contenu est hiérarchisé pour réduire la charge visuelle et aller directement à l’essentiel.</p>
              </div>

              <div class="steps-list">
                <article class="step-card" *ngFor="let step of quickSteps">
                  <span class="step-index">{{ step.index }}</span>
                  <div>
                    <h3>{{ step.title }}</h3>
                    <p>{{ step.description }}</p>
                  </div>
                </article>
              </div>
            </article>

            <article class="support-card support-card--accent">
              <span class="support-badge">Accès sécurisé</span>
              <h2>Connexion à l’espace CARFO</h2>
              <p>
                Les utilisateurs authentifiés accèdent à leurs modules selon leurs rôles, avec une interface cohérente et des couleurs conformes au logo.
              </p>

              <div class="support-actions">
                <button pButton type="button" class="primary-button" routerLink="/login" label="Se connecter"></button>
                <button pButton type="button" class="secondary-button secondary-button--dark" (click)="scrollToSection('stats')" label="Voir l’aperçu"></button>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: #f8fafc;
      color: #0f172a;
    }

    .landing-page {
      min-height: 100vh;
    }

    .hero-shell {
      position: relative;
      min-height: 100vh;
      overflow: hidden;
      color: #fff;
      background:
        radial-gradient(circle at top left, rgba(212, 175, 55, 0.18), transparent 28%),
        radial-gradient(circle at right center, rgba(139, 0, 0, 0.24), transparent 30%),
        linear-gradient(135deg, rgba(8, 76, 31, 0.98), rgba(13, 92, 63, 0.96) 45%, rgba(139, 0, 0, 0.93));
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(180deg, rgba(7, 18, 13, 0.15), rgba(7, 18, 13, 0.55)),
        url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
      opacity: 0.12;
      pointer-events: none;
    }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.1rem 2rem;
      backdrop-filter: blur(18px);
      background: rgba(8, 76, 31, 0.28);
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      text-decoration: none;
      color: white;
      min-width: 0;
    }

    .brand-logo {
      width: 48px;
      height: 48px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.95);
      display: grid;
      place-items: center;
      overflow: hidden;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
      flex: 0 0 auto;
    }

    .brand-logo img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 0.2rem;
    }

    .brand-copy {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .brand-name {
      font-size: 1.05rem;
      font-weight: 800;
      letter-spacing: 0.08em;
    }

    .brand-subtitle {
      font-size: 0.82rem;
      color: rgba(255, 255, 255, 0.72);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.4rem;
      color: rgba(255, 255, 255, 0.84);
      font-weight: 600;
      flex-wrap: wrap;
      justify-content: center;
    }

    .nav-links a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s ease, transform 0.2s ease;
    }

    .nav-links a:hover {
      color: white;
      transform: translateY(-1px);
    }

    .topbar-cta,
    .primary-button,
    .secondary-button,
    .featured-button {
      border: none;
      border-radius: 9999px;
      font-weight: 700;
      transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
      cursor: pointer;
    }

    .topbar-cta {
      background: linear-gradient(135deg, #d4af37, #f2d56b);
      color: #0a3f2b;
      box-shadow: 0 16px 28px rgba(212, 175, 55, 0.28);
    }

    .hero-section {
      position: relative;
      z-index: 2;
      display: grid;
      place-items: center;
      padding: 4rem 1.5rem 5rem;
    }

    .hero-grid {
      width: min(1240px, 100%);
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.9fr);
      gap: 2.5rem;
      align-items: center;
    }

    .hero-copy {
      max-width: 640px;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.55rem 0.9rem;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.16);
      color: rgba(255, 255, 255, 0.95);
      font-weight: 700;
      letter-spacing: 0.02em;
      margin-bottom: 1.2rem;
    }

    .hero-copy h1 {
      margin: 0;
      max-width: 13ch;
      font-size: clamp(2.7rem, 6vw, 5rem);
      line-height: 1.02;
      font-weight: 850;
      letter-spacing: -0.05em;
      text-wrap: balance;
    }

    .hero-copy p {
      margin: 1.25rem 0 0;
      max-width: 56rem;
      font-size: 1.08rem;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.82);
    }

    .hero-actions {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .hero-tags {
      margin-top: 1.5rem;
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .hero-tags span {
      padding: 0.55rem 0.85rem;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.16);
      color: rgba(255, 255, 255, 0.95);
      font-weight: 600;
      font-size: 0.92rem;
    }

    .topbar-cta,
    .primary-button,
    .secondary-button,
    .featured-button {
      padding: 0.95rem 1.45rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      min-height: 48px;
    }

    .primary-button {
      background: linear-gradient(135deg, #d4af37, #ffe08a);
      color: #0a3f2b;
      box-shadow: 0 18px 36px rgba(212, 175, 55, 0.28);
    }

    .secondary-button {
      background: rgba(255, 255, 255, 0.08);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.28);
    }

    .secondary-button--dark {
      background: rgba(255, 255, 255, 0.12);
      color: white;
      border-color: rgba(255, 255, 255, 0.18);
    }

    .primary-button:hover,
    .secondary-button:hover,
    .secondary-button--dark:hover,
    .topbar-cta:hover,
    .featured-button:hover {
      transform: translateY(-2px);
    }

    .hero-panel {
      position: relative;
      display: flex;
      justify-content: center;
    }

    .hero-panel__glass {
      width: 100%;
      padding: 1.5rem;
      border-radius: 1.75rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.16);
      backdrop-filter: blur(18px);
      box-shadow: 0 28px 60px rgba(7, 18, 13, 0.2);
    }

    .panel-header {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      margin-bottom: 1.1rem;
    }

    .panel-kicker {
      color: rgba(255, 255, 255, 0.72);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 0.74rem;
      font-weight: 700;
    }

    .panel-header strong {
      font-size: 1.25rem;
      color: white;
    }

    .panel-stats {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.8rem;
      margin-bottom: 1rem;
    }

    .panel-stat {
      padding: 1rem;
      border-radius: 1.1rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }

    .panel-stat__value {
      display: block;
      color: white;
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1;
    }

    .panel-stat__label {
      display: block;
      margin-top: 0.4rem;
      color: rgba(255, 255, 255, 0.72);
      font-size: 0.92rem;
    }

    .panel-signals {
      display: grid;
      gap: 0.8rem;
      margin-top: 1rem;
    }

    .signal-row {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.8rem;
      align-items: start;
      padding: 0.9rem 1rem;
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .signal-dot {
      width: 10px;
      height: 10px;
      border-radius: 9999px;
      background: linear-gradient(135deg, #d4af37, #8b0000);
      margin-top: 0.35rem;
      box-shadow: 0 0 0 6px rgba(212, 175, 55, 0.15);
    }

    .signal-row strong {
      display: block;
      color: white;
      margin-bottom: 0.18rem;
    }

    .signal-row p {
      margin: 0;
      color: rgba(255, 255, 255, 0.72);
      line-height: 1.55;
      font-size: 0.94rem;
    }

    .wave-bottom {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      height: 120px;
      background: #f8fafc;
      border-top-left-radius: 60% 100%;
      border-top-right-radius: 60% 100%;
      z-index: 1;
    }

    .section-wrap {
      padding: 4rem 1.5rem 5rem;
      max-width: 1240px;
      margin: 0 auto;
    }

    .section-wrap--alt {
      padding-top: 1rem;
    }

    .section-title {
      text-align: center;
      margin-bottom: 2rem;
    }

    .section-title.compact {
      text-align: left;
      margin-bottom: 1rem;
    }

    .section-title h2 {
      margin: 0;
      font-size: clamp(1.8rem, 3vw, 2.5rem);
      color: #0f172a;
      letter-spacing: -0.03em;
    }

    .section-title p {
      margin: 0.75rem 0 0;
      color: #64748b;
      line-height: 1.7;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
      margin-top: 2rem;
    }

    .stat-card {
      text-align: center;
      padding: 1.35rem 1rem;
      border-radius: 1.25rem;
      background: white;
      border: 1px solid rgba(13, 92, 63, 0.12);
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 850;
      color: #0d5c3f;
      line-height: 1;
    }

    .stat-label {
      color: #64748b;
      margin-top: 0.35rem;
      font-size: 0.95rem;
    }

    .modules-layout {
      display: grid;
      grid-template-columns: minmax(320px, 0.92fr) minmax(0, 1.08fr);
      gap: 1.25rem;
      align-items: start;
      margin-top: 2rem;
    }

    .featured-module,
    .support-card,
    .module-card {
      border-radius: 1.35rem;
      background: white;
      border: 1px solid rgba(13, 92, 63, 0.12);
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
    }

    .featured-module {
      padding: 1.5rem;
      position: sticky;
      top: 96px;
    }

    .featured-module__top h3 {
      margin: 0.6rem 0 0;
      font-size: 1.55rem;
      color: #0f172a;
    }

    .featured-module__top p {
      margin: 0.9rem 0 0;
      color: #475569;
      line-height: 1.75;
    }

    .featured-module__badge,
    .module-badge,
    .support-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.45rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .featured-module__badge,
    .support-badge {
      background: rgba(13, 92, 63, 0.1);
      color: #0d5c3f;
    }

    .module-badge {
      background: rgba(212, 175, 55, 0.14);
      color: #8b0000;
    }

    .featured-module__list {
      margin: 1.2rem 0 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 0.8rem;
    }

    .featured-module__list li {
      position: relative;
      padding-left: 1.45rem;
      color: #334155;
      line-height: 1.6;
    }

    .featured-module__list li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.58rem;
      width: 0.55rem;
      height: 0.55rem;
      border-radius: 9999px;
      background: linear-gradient(135deg, #0d5c3f, #8b0000);
      box-shadow: 0 0 0 5px rgba(13, 92, 63, 0.08);
    }

    .featured-module__footer {
      margin-top: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
      color: #64748b;
    }

    .featured-button {
      background: linear-gradient(135deg, #0d5c3f, #8b0000);
      color: white;
      box-shadow: 0 16px 32px rgba(13, 92, 63, 0.18);
    }

    .modules-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .module-card {
      padding: 1.35rem;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .module-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 18px 34px rgba(15, 23, 42, 0.1);
    }

    .module-card__head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .module-icon {
      width: 54px;
      height: 54px;
      border-radius: 1rem;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, rgba(13, 92, 63, 0.12), rgba(212, 175, 55, 0.18));
      font-size: 1.5rem;
      flex: 0 0 auto;
    }

    .module-card h3 {
      margin: 0;
      font-size: 1.18rem;
      color: #0f172a;
    }

    .module-card p {
      margin: 0;
      color: #475569;
      line-height: 1.7;
    }

    .module-points {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 0.55rem;
    }

    .module-points li {
      position: relative;
      padding-left: 1rem;
      color: #475569;
      font-size: 0.95rem;
    }

    .module-points li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.55rem;
      width: 0.42rem;
      height: 0.42rem;
      border-radius: 9999px;
      background: #d4af37;
    }

    .module-footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding-top: 0.35rem;
      color: #64748b;
      font-size: 0.92rem;
    }

    .module-footer a {
      color: #0d5c3f;
      font-weight: 700;
      text-decoration: none;
    }

    .support-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
      gap: 1.25rem;
    }

    .support-card {
      padding: 1.5rem;
    }

    .support-card--accent {
      color: white;
      background: linear-gradient(135deg, #0d5c3f, #8b0000);
      border: none;
      box-shadow: 0 18px 36px rgba(13, 92, 63, 0.18);
    }

    .support-card--accent h2,
    .support-card--accent p {
      color: inherit;
    }

    .steps-list {
      display: grid;
      gap: 0.9rem;
    }

    .step-card {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.9rem;
      align-items: start;
      padding: 0.95rem 1rem;
      border-radius: 1rem;
      background: #f8fafc;
      border: 1px solid rgba(13, 92, 63, 0.08);
    }

    .step-index {
      width: 2rem;
      height: 2rem;
      display: grid;
      place-items: center;
      border-radius: 9999px;
      background: rgba(212, 175, 55, 0.16);
      color: #8b0000;
      font-weight: 800;
      flex: 0 0 auto;
    }

    .step-card h3 {
      margin: 0 0 0.25rem;
      font-size: 1rem;
      color: #0f172a;
    }

    .step-card p {
      margin: 0;
      color: #64748b;
      line-height: 1.6;
    }

    .support-card--accent .support-actions {
      display: flex;
      gap: 0.9rem;
      flex-wrap: wrap;
      margin-top: 1.4rem;
    }

    .support-card--accent .primary-button {
      background: linear-gradient(135deg, #d4af37, #ffe08a);
      color: #0a3f2b;
    }

    .support-card--accent .secondary-button {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 1100px) {
      .hero-grid,
      .modules-layout,
      .support-grid {
        grid-template-columns: 1fr;
      }

      .featured-module {
        position: static;
      }

      .modules-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 900px) {
      .nav-links {
        display: none;
      }

      .stats-grid,
      .panel-stats,
      .modules-grid {
        grid-template-columns: 1fr;
      }

      .topbar {
        padding: 0.95rem 1rem;
      }

      .hero-section {
        padding: 3rem 1rem 4rem;
      }

      .section-wrap {
        padding: 3rem 1rem 4rem;
      }

      .hero-copy h1 {
        max-width: none;
        font-size: clamp(2.2rem, 12vw, 3.5rem);
      }

      .hero-copy p {
        font-size: 1rem;
      }
    }

    @media (max-width: 640px) {
      .hero-panel__glass,
      .featured-module,
      .support-card,
      .module-card {
        border-radius: 1.15rem;
      }

      .hero-actions,
      .support-card--accent .support-actions {
        flex-direction: column;
      }

      .primary-button,
      .secondary-button,
      .featured-button,
      .topbar-cta {
        width: 100%;
      }

      .topbar {
        gap: 0.75rem;
      }

      .brand-subtitle {
        white-space: normal;
      }
    }
  `]
})
export class LandingHomeComponent {
  stats = [
    { number: '06', label: 'Modules principaux' },
    { number: '03', label: 'Profils d’accès' },
    { number: '04', label: 'Flux métier centraux' },
    { number: '100%', label: 'Vue centralisée' }
  ];

  heroTags = ['Missions', 'Agents', 'Véhicules', 'Absences'];

  heroSignals = [
    { title: 'Hiérarchie claire', description: 'Chaque bloc visuel guide rapidement vers l’action utile.' },
    { title: 'Lecture rapide', description: 'Les informations importantes sont regroupées dans des cartes homogènes.' },
    { title: 'Accès direct', description: 'Les modules essentiels restent visibles sans surcharge visuelle.' }
  ];

  modules = [
    {
      icon: '👥',
      badge: 'Ressources',
      title: 'Agents',
      description: 'Gérez les profils, les rôles et les habilitations avec une interface simple et structurée.',
      points: ['Profils et rôles', 'Statut actif / inactif', 'Affectation aux directions'],
      footer: 'Equipe et responsabilités',
      route: '/agents'
    },
    {
      icon: '🚗',
      badge: 'Flotte',
      title: 'Véhicules',
      description: 'Suivez la disponibilité et l’état du parc pour préparer les missions plus vite.',
      points: ['Immatriculation et modèle', 'Disponibilité immédiate', 'Suivi opérationnel'],
      footer: 'Parc automobile',
      route: '/vehicules'
    },
    {
      icon: '🗓️',
      badge: 'Disponibilités',
      title: 'Absences',
      description: 'Consultez et validez les absences pour garder une planification fiable.',
      points: ['Déclaration simple', 'Validation rapide', 'Suivi des statuts'],
      footer: 'Présence et continuité',
      route: '/absences'
    },
    {
      icon: '🏢',
      badge: 'Structure',
      title: 'Directions',
      description: 'Organisez les équipes par direction avec des repères visuels plus lisibles.',
      points: ['Arborescence claire', 'Nom des directions', 'Gestion centralisée'],
      footer: 'Organisation interne',
      route: '/directions'
    },
    {
      icon: '📊',
      badge: 'Pilotage',
      title: 'Dashboard',
      description: 'Accédez aux indicateurs utiles pour suivre l’activité en un coup d’œil.',
      points: ['KPI visibles', 'Vue synthétique', 'Données utiles'],
      footer: 'Suivi des indicateurs',
      route: '/dashboard'
    }
  ];

  quickSteps = [
    { index: '1', title: 'Créer la mission', description: 'Lancer le flux avec les informations principales, sans charger l’écran.' },
    { index: '2', title: 'Affecter les ressources', description: 'Attribuer agents et véhicules dans une logique plus fluide.' },
    { index: '3', title: 'Suivre l’avancement', description: 'Consulter les statuts, absences et tableaux de bord depuis un seul espace.' }
  ];

  scrollToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
