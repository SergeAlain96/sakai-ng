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
        <div class="topbar">
          <a class="brand" routerLink="/landing">
            <span class="brand-logo">
              <img src="assets/logo-carfo.png" alt="CARFO" />
            </span>
            <span class="brand-name">CARFO</span>
          </a>

          <nav class="nav-links" aria-label="Navigation principale">
            <a href="#home">Accueil</a>
            <a href="#modules">Modules</a>
            <a href="#stats">Statistiques</a>
            <a href="#support">Support</a>
          </nav>

          <button pButton type="button" class="topbar-cta" routerLink="/login" label="Essayez-le gratuitement"></button>
        </div>

        <div class="hero-section">
          <div class="hero-card">
            <div class="eyebrow">🚀 CARFO — Gestion intégrée des missions</div>
            <h1>Une plateforme claire pour missions, agents et véhicules</h1>
            <p>
              Planifiez les missions, affectez les agents et les véhicules, suivez les absences et pilotez vos statistiques
              avec une interface moderne, centrée sur les besoins du projet CARFO.
            </p>

            <div class="hero-actions">
              <button pButton type="button" class="primary-button" routerLink="/login" label="Commencer"></button>
              <button pButton type="button" class="secondary-button" (click)="scrollToSection('modules')" label="Voir les modules"></button>
            </div>

            <button class="play-button" type="button" (click)="scrollToSection('modules')" aria-label="Voir les modules">
              <span>▶</span>
            </button>
          </div>
        </div>

        <div class="wave-bottom"></div>
      </header>

      <main>
        <section class="section-wrap" id="stats">
          <div class="section-title">
            <h2>Statistiques clés</h2>
            <p>Une vue rapide sur l’activité de la plateforme.</p>
          </div>
          <div class="stats-strip">
            <div class="stat-card" *ngFor="let stat of stats">
              <div class="stat-value">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </section>

        <section class="section-wrap" id="modules">
          <div class="section-title">
            <h2>Modules du projet</h2>
            <p>Les blocs fonctionnels réellement utiles au projet CARFO.</p>
          </div>
          <div class="feature-grid">
            <article class="feature-card" *ngFor="let feature of features">
              <div class="feature-icon">{{ feature.icon }}</div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </article>
          </div>
        </section>

        <section class="section-wrap" id="support">
          <div class="cta-band">
            <div class="section-title compact">
              <h2>Prêt à travailler avec CARFO ?</h2>
            </div>
            <p>
              Une page d’accueil simple, cohérente avec le logo CARFO, et directement connectée aux modules du système.
            </p>
            <button pButton type="button" class="primary-button cta-button" routerLink="/login" label="Se connecter"></button>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    :host { display:block; background:#f8fafc; color:#0f172a; }
    .landing-page { min-height:100vh; }
    .hero-shell { position:relative; min-height:100vh; overflow:hidden; color:#fff; background: linear-gradient(90deg, rgba(13,92,63,0.92) 0%, rgba(139,0,0,0.88) 50%, rgba(212,175,55,0.85) 100%), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat; }
    .hero-shell::after { content:''; position:absolute; left:0; right:0; bottom:0; height:140px; background:linear-gradient(180deg, rgba(255,255,255,0) 0%, #f8fafc 100%); clip-path:ellipse(70% 65% at 50% 100%); }
    .topbar { position:sticky; top:0; z-index:30; display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:1.25rem 2rem; backdrop-filter:blur(14px); background:rgba(13,92,63,0.28); border-bottom:1px solid rgba(255,255,255,0.12); }
    .brand { display:flex; align-items:center; gap:0.75rem; text-decoration:none; color:white; font-weight:800; letter-spacing:0.08em; }
    .brand-logo { width:44px; height:44px; border-radius:14px; background:white; display:grid; place-items:center; overflow:hidden; box-shadow:0 12px 28px rgba(0,0,0,0.18); }
    .brand-logo img { width:100%; height:100%; object-fit:contain; padding:0.2rem; }
    .brand-name { font-size:1.05rem; }
    .nav-links { display:flex; align-items:center; gap:1.5rem; color:rgba(255,255,255,0.78); font-weight:600; flex-wrap:wrap; justify-content:center; }
    .nav-links a { color:inherit; text-decoration:none; transition:color .25s ease, transform .25s ease; }
    .nav-links a:hover { color:white; transform:translateY(-1px); }
    .topbar-cta, .primary-button, .secondary-button { border:none; border-radius:9999px; font-weight:700; transition:transform .25s ease, box-shadow .25s ease, background .25s ease; }
    .topbar-cta { background:linear-gradient(135deg,#8B0000,#A50000); color:white; box-shadow:0 16px 28px rgba(139,0,0,0.28); }
    .hero-section { min-height:calc(100vh - 88px); display:grid; place-items:center; padding:4rem 1.5rem 5rem; position:relative; z-index:2; }
    .hero-card { width:min(920px,100%); text-align:center; padding:4rem 2rem 3rem; border-radius:2rem; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.16); box-shadow:0 28px 80px rgba(17,24,39,0.2); backdrop-filter:blur(14px); }
    .eyebrow { display:inline-flex; align-items:center; gap:.5rem; padding:.5rem .9rem; border-radius:9999px; background:rgba(255,255,255,0.14); border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.95); font-weight:700; letter-spacing:.03em; margin-bottom:1.5rem; }
    .hero-card h1 { margin:0 auto; max-width:11ch; font-size:clamp(2.7rem,6vw,4.8rem); line-height:1.04; font-weight:800; letter-spacing:-0.04em; color:white; text-wrap:balance; }
    .hero-card p { margin:1.25rem auto 0; max-width:760px; font-size:1.15rem; line-height:1.75; color:rgba(255,255,255,0.78); }
    .hero-actions { margin-top:2rem; display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; }
    .topbar-cta, .primary-button, .secondary-button, .cta-button { padding:.95rem 1.6rem; display:inline-flex; align-items:center; justify-content:center; text-decoration:none; cursor:pointer; }
    .primary-button { background:#D4AF37; color:#0D5C3F; box-shadow:0 18px 36px rgba(212,175,55,0.28); font-weight:700; }
    .secondary-button { background:rgba(255,255,255,0.08); color:white; border:1px solid rgba(255,255,255,0.32); }
    .primary-button:hover, .secondary-button:hover, .topbar-cta:hover, .play-button:hover { transform:translateY(-2px); }
    .play-button { margin:2rem auto 0; width:82px; height:82px; border-radius:50%; display:grid; place-items:center; border:3px solid rgba(212,175,55,0.5); background:rgba(212,175,55,0.18); color:white; box-shadow:0 14px 30px rgba(0,0,0,0.2); cursor:pointer; }
    .play-button span { font-size:1.25rem; transform:translateX(2px); }
    .wave-bottom { position:absolute; left:0; right:0; bottom:-1px; height:140px; background:#f8fafc; border-top-left-radius:60% 100%; border-top-right-radius:60% 100%; z-index:1; }
    .section-wrap { padding:4rem 1.5rem 5rem; max-width:1200px; margin:0 auto; }
    .section-title { text-align:center; margin-bottom:2rem; }
    .section-title.compact { margin-bottom:.75rem; }
    .section-title h2 { margin:0; font-size:clamp(1.8rem,3vw,2.5rem); color:#0f172a; }
    .section-title p { margin:.75rem 0 0; color:#64748b; }
    .stats-strip { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:1rem; margin-top:2rem; }
    .stat-card { text-align:center; padding:1.5rem; border-radius:1.25rem; background:white; border:1px solid rgba(13,92,63,0.12); box-shadow:0 12px 30px rgba(15,23,42,0.06); }
    .stat-value { font-size:2rem; font-weight:800; color:#0D5C3F; }
    .stat-label { color:#64748b; margin-top:.35rem; font-size:.95rem; }
    .feature-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1rem; margin-top:2rem; }
    .feature-card { padding:1.5rem; border-radius:1.25rem; background:white; border:1px solid rgba(13,92,63,0.12); box-shadow:0 12px 30px rgba(15,23,42,0.06); transition:transform .25s ease, box-shadow .25s ease; }
    .feature-card:hover { transform:translateY(-6px); box-shadow:0 18px 34px rgba(15,23,42,0.12); }
    .feature-icon { width:54px; height:54px; border-radius:1rem; display:grid; place-items:center; background:linear-gradient(135deg, rgba(13,92,63,0.14), rgba(139,0,0,0.14)); font-size:1.5rem; margin-bottom:1rem; }
    .feature-title { margin:0 0 .5rem; font-size:1.1rem; color:#0f172a; }
    .feature-description { margin:0; color:#64748b; line-height:1.7; }
    .cta-band { padding:2rem; border-radius:1.5rem; background:linear-gradient(135deg, rgba(13,92,63,0.12), rgba(139,0,0,0.12)); border:1px solid rgba(13,92,63,0.15); text-align:center; }
    .cta-band p { margin:.75rem auto 1.5rem; max-width:760px; color:#475569; }
    .cta-button { background:linear-gradient(135deg,#0D5C3F,#8B0000); color:white; }
    @media (max-width: 1024px) { .nav-links { display:none; } .stats-strip, .feature-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } }
    @media (max-width: 768px) { .topbar { padding:1rem; } .hero-shell { background-position:center top; } .hero-card { padding:2.5rem 1.25rem 2rem; border-radius:1.5rem; } .hero-card h1 { font-size:clamp(2.2rem,11vw,3.25rem); } .hero-card p { font-size:1rem; } .stats-strip, .feature-grid { grid-template-columns:1fr; } .section-wrap { padding:3rem 1rem 4rem; } }
  `]
})
export class LandingHomeComponent {
  stats = [
    { number: '500+', label: 'Missions gérées' },
    { number: '98%', label: 'Satisfaction' },
    { number: '24/7', label: 'Support' },
    { number: '50+', label: 'Partenaires' }
  ];

  features = [
    { icon: '📋', title: 'Gestion des Missions', description: 'Créez, planifiez et suivez vos missions en temps réel avec un système intuitif et performant.' },
    { icon: '🚗', title: 'Gestion des Véhicules', description: 'Inventoriez et maintenez vos véhicules. Suivez leur disponibilité et leur entretien.' },
    { icon: '👥', title: 'Gestion des Agents', description: 'Gérez vos équipes, leurs compétences et leurs affectations aux missions.' },
    { icon: '📊', title: 'Tableaux de Bord', description: 'Visualisez les statistiques clés et prenez des décisions basées sur les données.' },
    { icon: '🗓️', title: 'Gestion des Absences', description: 'Suivez les congés et absences de votre équipe pour une meilleure planification.' },
    { icon: '🔒', title: 'Sécurité Garantie', description: 'Authentification sécurisée et gestion des permissions pour protéger vos données.' }
  ];

  scrollToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
