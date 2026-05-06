export { LandingHomeComponent as Landing } from './landing-home.component';
/*
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
    standalone: true,
    imports: [CommonModule, RouterModule, TopbarWidget, FooterWidget, RippleModule, ButtonModule, CardModule],
    styles: [`
        :host ::ng-deep {
    imports: [CommonModule, RouterModule, RippleModule, ButtonModule, CardModule],
                background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                background-size: 400% 400%;
            --carfo-blue: #2563eb;
            --carfo-blue-dark: #1d4ed8;
            --carfo-purple: #7c3aed;
            --carfo-purple-dark: #5b21b6;
            --carfo-accent: #ff4d4f;
            --carfo-ink: #f8fafc;
            --carfo-muted: rgba(255, 255, 255, 0.78);

            .landing-page {
                min-height: 100vh;
                background: #f8fafc;
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            .hero-shell {
                position: relative;
                min-height: 100vh;
                overflow: hidden;
                color: var(--carfo-ink);
                background:
                    linear-gradient(90deg, rgba(29, 78, 216, 0.88) 0%, rgba(124, 58, 237, 0.84) 52%, rgba(190, 24, 93, 0.82) 100%),
                    url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
                min-height: 100vh;
                display: flex;
            .hero-shell::after {
                content: '';

                bottom: 0;
                left: -5%;
                right: -5%;
                height: 140px;
                display: block;
                background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #f8fafc 100%);
                clip-path: ellipse(70% 65% at 50% 100%);
                position: absolute;
                width: 100%;
            .topbar {
                position: sticky;
                top: 0;
                z-index: 30;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                padding: 1.25rem 2rem;
                backdrop-filter: blur(14px);
                background: rgba(76, 29, 149, 0.24);
                border-bottom: 1px solid rgba(255, 255, 255, 0.12);
            }

            .brand {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                text-decoration: none;
                color: white;
                font-weight: 800;
                letter-spacing: 0.08em;
            }

            .brand-logo {
                width: 44px;
                height: 44px;
                border-radius: 14px;
                background: rgba(255, 255, 255, 0.18);
                display: grid;
                place-items: center;
                border: 1px solid rgba(255, 255, 255, 0.18);
                overflow: hidden;
                box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
            }

            .brand-logo img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                padding: 0.2rem;
                background: white;
            }

            .nav-links {
                overflow: hidden;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                align-items: center;
                gap: 2rem;
                color: rgba(255, 255, 255, 0.78);
                font-weight: 600;
                position: absolute;
                opacity: 0.1;
            .nav-links a {
                color: inherit;
                text-decoration: none;
                transition: color 0.25s ease, transform 0.25s ease;
                width: 300px;
                height: 300px;
            .nav-links a:hover {
                color: white;
                transform: translateY(-1px);
                width: 250px;
                height: 250px;
            .topbar-cta {
                background: linear-gradient(135deg, var(--carfo-accent), #ff7a59);
                color: white;
                border: none;
                padding: 0.95rem 1.5rem;
                border-radius: 9999px;
                font-weight: 700;
                box-shadow: 0 16px 28px rgba(255, 77, 79, 0.28);
                width: 200px;
                height: 200px;
            .hero-section {
                min-height: calc(100vh - 88px);
                display: grid;
                place-items: center;
                padding: 4rem 1.5rem 5rem;
                position: relative;
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                50% { transform: translate(30px, -30px) rotate(180deg); }
            .hero-card {
                width: min(920px, 100%);
                text-align: center;
                padding: 4rem 2rem 3rem;
                border-radius: 2rem;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.16);
                box-shadow: 0 28px 80px rgba(17, 24, 39, 0.2);
                backdrop-filter: blur(14px);
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                50% { transform: translate(-40px, 40px) rotate(180deg); }
            .eyebrow {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 0.9rem;
                border-radius: 9999px;
                background: rgba(255, 255, 255, 0.14);
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: rgba(255, 255, 255, 0.9);
                font-weight: 700;
                letter-spacing: 0.03em;
                margin-bottom: 1.5rem;
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(-20px, 20px); }
            .hero-title {
                margin: 0 auto;
                max-width: 11ch;
                font-size: clamp(2.7rem, 6vw, 4.8rem);
                line-height: 1.04;
                font-weight: 800;
                letter-spacing: -0.04em;
                color: white;
                text-wrap: balance;
                position: relative;
                z-index: 10;
            .hero-subtitle {
                margin: 1.25rem auto 0;
                max-width: 760px;
                font-size: 1.15rem;
                line-height: 1.75;
                color: var(--carfo-muted);
                from {
                    opacity: 0;
            .hero-actions {
                margin-top: 2rem;
                display: flex;
                justify-content: center;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .primary-button,
            .secondary-button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 0.55rem;
                padding: 0.95rem 1.6rem;
                border-radius: 9999px;
                font-weight: 700;
                text-decoration: none;
                transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
            }

            .primary-button {
                background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                color: var(--carfo-purple-dark);
                box-shadow: 0 18px 36px rgba(255, 255, 255, 0.18);
            }

            .secondary-button {
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.32);
                background: rgba(255, 255, 255, 0.08);
            }

            .primary-button:hover,
            .secondary-button:hover,
            .play-button:hover,
            .topbar-cta:hover {
                transform: translateY(-2px);
            }

            .play-button {
                margin: 2rem auto 0;
                width: 82px;
                height: 82px;
                border-radius: 50%;
                display: grid;
                place-items: center;
                border: 3px solid rgba(255, 255, 255, 0.32);
                background: rgba(255, 77, 79, 0.2);
                color: white;
                box-shadow: 0 14px 30px rgba(0, 0, 0, 0.2);
                cursor: pointer;
            }

            .play-button span {
                font-size: 1.25rem;
                transform: translateX(2px);
            }

            .wave-bottom {
                position: absolute;
                bottom: -1px;
                left: 0;
                width: 100%;
                height: 140px;
                background: #f8fafc;
                border-top-left-radius: 60% 100%;
                border-top-right-radius: 60% 100%;
            }

            .floating-panel {
                position: absolute;
                left: 1rem;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                z-index: 4;
            }

            .floating-chip {
                width: 52px;
                height: 52px;
                display: grid;
                place-items: center;
                border-radius: 0.75rem;
                color: white;
                background: rgba(15, 23, 42, 0.82);
                border: 1px solid rgba(255, 255, 255, 0.12);
                box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
            }

            .section-wrap {
                padding: 4rem 1.5rem 5rem;
                max-width: 1200px;
                margin: 0 auto;
            }

            .section-title {
                text-align: center;
                margin-bottom: 2rem;
            }

            .section-title h2 {
                margin: 0;
                font-size: clamp(1.8rem, 3vw, 2.5rem);
                color: #0f172a;
            }

            .section-title p {
                margin: 0.75rem 0 0;
                color: #64748b;
            }

            .stats-strip {
                display: grid;
                grid-template-columns: repeat(4, minmax(0, 1fr));
                gap: 1rem;
                margin-top: 2rem;
            }

            .stat-card {
                text-align: center;
                padding: 1.5rem;
                border-radius: 1.25rem;
                background: white;
                border: 1px solid rgba(37, 99, 235, 0.08);
                box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
            }

            .stat-value {
                font-size: 2rem;
                font-weight: 800;
                color: var(--carfo-purple-dark);
            }

            .stat-label {
                color: #64748b;
                margin-top: 0.35rem;
                font-size: 0.95rem;
            }

            .feature-grid {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 1rem;
                margin-top: 2rem;
            }

            .feature-card {
                padding: 1.5rem;
                border-radius: 1.25rem;
                background: white;
                border: 1px solid rgba(37, 99, 235, 0.08);
                box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
                transition: transform 0.25s ease, box-shadow 0.25s ease;
            }

            .feature-card:hover {
                transform: translateY(-6px);
                box-shadow: 0 18px 34px rgba(15, 23, 42, 0.12);
            }

            .feature-icon {
                width: 54px;
                height: 54px;
                border-radius: 1rem;
                display: grid;
                place-items: center;
                background: linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(124, 58, 237, 0.12));
                font-size: 1.5rem;
                margin-bottom: 1rem;
            }

            .feature-title {
                margin: 0 0 0.5rem;
                font-size: 1.1rem;
                color: #0f172a;
            }

            .feature-description {
                margin: 0;
                color: #64748b;
                line-height: 1.7;
            }

            .cta-band {
                margin-top: 3rem;
                padding: 2rem;
                border-radius: 1.5rem;
                background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(124, 58, 237, 0.1));
                border: 1px solid rgba(37, 99, 235, 0.1);
                text-align: center;
            }

            .cta-band p {
                margin: 0.75rem auto 1.5rem;
                max-width: 760px;
                color: #475569;
            }

            .cta-band .primary-button {
                background: linear-gradient(135deg, var(--carfo-blue), var(--carfo-purple));
                color: white;
            }

            @media (max-width: 1024px) {
                .nav-links {
                    display: none;
                }

                .stats-strip,
                .feature-grid {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                }
            }

            @media (max-width: 768px) {
                .topbar {
                    padding: 1rem;
                }

                .hero-shell {
                    background-position: center top;
                }

                .hero-card {
                    padding: 2.5rem 1.25rem 2rem;
                    border-radius: 1.5rem;
                }

                .hero-title {
                    font-size: clamp(2.2rem, 11vw, 3.25rem);
                }

                .hero-subtitle {
                    font-size: 1rem;
                }

                .floating-panel {
                    display: none;
                }

                .stats-strip,
                .feature-grid {
                    grid-template-columns: 1fr;
                }

                .section-wrap {
                    padding: 3rem 1rem 4rem;
                }
            .hero-title {
                font-size: 4rem;
    template: `
        <div class="bg-white dark:bg-slate-900 min-h-screen">
            <!-- Header -->
        <div class="landing-page">
            <header class="hero-shell" id="home">
                <div class="topbar">
                    <a class="brand" routerLink="/landing">
                        <span class="brand-logo">
                            <img src="assets/logo-carfo.png" alt="CARFO" />
                        </span>
                        <span>CARFO</span>
                    </a>

                    <nav class="nav-links" aria-label="Navigation principale">
                        <a href="#home">Maison</a>
                        <a href="#services">Services</a>
                        <a href="#features">Caractéristiques</a>
                        <a href="#pricing">Tarification</a>
                        <a href="#team">Équipe</a>
                        <a href="#blog">Blog</a>
                        <a href="#contact">Contact</a>
                    </nav>

                    <button class="topbar-cta" routerLink="/login" pRipple>Essayez-le gratuitement</button>
                </div>

                <div class="hero-section">
                    <div class="floating-panel" aria-hidden="true">
                        <div class="floating-chip">⚙</div>
                        <div class="floating-chip">☼</div>
                    </div>

                    <div class="hero-card">
                        <div class="eyebrow">🚀 Gestion des missions, agents et véhicules</div>
                        <h1 class="hero-title">Nous aidons les équipes à lancer leurs missions</h1>
                        <p class="hero-subtitle">
                            Une plateforme moderne pour planifier, suivre et valider les missions de bout en bout,
                            avec l’identité visuelle CARFO et une expérience simple.
                        </p>

                        <div class="hero-actions">
                            <a class="primary-button" routerLink="/login" pRipple>Commencer</a>
                            <a class="secondary-button" (click)="scrollToSection('services')" pRipple>Découvrir la plateforme</a>
                        </div>

                        <button class="play-button" type="button" (click)="scrollToSection('features')" aria-label="Voir les fonctionnalités">
                            <span>▶</span>
                        </button>
                    </div>
                </div>

                <div class="wave-bottom"></div>
            </header>

            <section class="section-wrap" id="services">
                <div class="section-title">
                    <h2>Services essentiels</h2>
                    <p>Tout ce qu’il faut pour suivre vos activités au quotidien.</p>
                </div>
                <div class="stats-strip">
                    <div class="stat-card" *ngFor="let stat of stats">
                        <div class="stat-value">{{ stat.number }}</div>
                        <div class="stat-label">{{ stat.label }}</div>
                    </div>
                </div>
            </section>

            <section class="section-wrap" id="features">
                <div class="section-title">
                    <h2>Caractéristiques principales</h2>
                    <p>Une interface claire, rapide et orientée productivité.</p>
                </div>
                <div class="feature-grid">
                    <article class="feature-card" *ngFor="let feature of features">
                        <div class="feature-icon">{{ feature.icon }}</div>
                        <h3 class="feature-title">{{ feature.title }}</h3>
                        <p class="feature-description">{{ feature.description }}</p>
                    </article>
                </div>
            </section>

            <section class="section-wrap" id="pricing">
                <div class="cta-band">
                    <div class="section-title">
                        <h2>Prêt à moderniser votre gestion ?</h2>
                    </div>
                    <p>
                        Rejoignez une interface plus lisible, plus élégante et alignée sur les couleurs du logo CARFO.
                    </p>
                    <a class="primary-button" routerLink="/login" pRipple>Se connecter</a>
                </div>
            </section>

            <section class="section-wrap" id="team">
                <div class="section-title">
                    <h2>Équipe & suivi</h2>
                    <p>Une vue d’ensemble pour vos équipes et vos prises de décision.</p>
                </div>
            </section>

            <section class="section-wrap" id="blog">
                <div class="section-title">
                    <h2>Blog</h2>
                    <p>Conseils, annonces et bonnes pratiques à venir.</p>
                </div>
            </section>

            <section class="section-wrap" id="contact">
                <div class="section-title">
                    <h2>Contact</h2>
                    <p>Besoin d’un accès ou d’une démonstration ?</p>
                </div>
            </section>
})
*/
