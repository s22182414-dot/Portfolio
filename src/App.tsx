import { useState, useEffect } from 'react'
import PROJECTS from './projects.json'

// ============================================
// DATA DEFINITIONS
// ============================================
export interface Project {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  github: string;
  live: string;
}

const SKILLS = [
  {
    title: 'Frontend Development',
    skills: ['React / Next.js', 'TypeScript', 'CSS / Animations', 'Responsive Design'],
  },
  {
    title: 'Backend & APIs',
    skills: ['Node.js'],
  },
  {
    title: 'DevOps & Tooling',
    skills: ['Git / GitHub', 'Render', 'Vercel', 'Vite / Build Tools'],
  },
]

// ============================================
// COMPONENTS
// ============================================

function Navbar({ 
  theme, 
  toggleTheme, 
  onNavigate,
  isAdmin
}: { 
  theme: 'light' | 'dark'; 
  toggleTheme: () => void; 
  onNavigate: (path: string, e: React.MouseEvent) => void;
  isAdmin: boolean;
}) {
  return (
    <nav className="nav">
      <div className="container nav__inner">
        <a href="/" className="nav__logo" onClick={(e) => onNavigate('/', e)}>SRN.</a>
        <div className="nav__menu">
          {!isAdmin ? (
            <ul className="nav__links">
              <li><a href="/about" className="nav__link" onClick={(e) => onNavigate('/about', e)}>Haqimda</a></li>
              <li><a href="/projects" className="nav__link" onClick={(e) => onNavigate('/projects', e)}>Loyihalar</a></li>
              <li><a href="/contact" className="nav__link" onClick={(e) => onNavigate('/contact', e)}>Aloqa</a></li>
            </ul>
          ) : (
            <a href="/" className="nav__link" onClick={(e) => onNavigate('/', e)}>Bosh sahifa</a>
          )}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" title="Mavzuni o'zgartirish">
            {theme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

function Hero({ onNavigate }: { onNavigate: (path: string, e: React.MouseEvent) => void }) {
  return (
    <header className="hero section" id="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Loyihalar uchun ochiqman
          </div>
          <h1 className="hero__title">
            Sunnatillo Rustamshayev
          </h1>
          <p className="hero__description">
            Full-stack veb dasturchi. Foydalanuvchilarga qulay va tezkor raqamli yechimlarni loyihalash hamda ularni amalga oshirish bilan shug'ullanaman.
          </p>
          <div className="hero__actions">
            <a href="/projects" className="btn btn--primary" onClick={(e) => onNavigate('/projects', e)}>Loyihalar</a>
            <a href="/contact" className="btn btn--secondary" onClick={(e) => onNavigate('/contact', e)}>Bog'lanish</a>
          </div>
        </div>
        <div className="hero__avatar-wrap">
          <div className="hero__avatar">
            <img src="/avatar.png" alt="Sunnatillo Rustamshayev" />
          </div>
        </div>
      </div>
    </header>
  )
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title">Haqimda</h2>
        <div className="about__grid">
          <div className="about__text">
            <p>
              Dasturlash dunyosiga bo'lgan sayohatim 2021-yilda boshlangan. Hozirda murakkab foydalanuvchi interfeyslari (UI/UX) va yuklamalarga chidamli backend tizimlarni loyihalash bo'yicha mustahkam ko'nikmalarga egaman.
            </p>
            <p>
              Mening yondashuvim — soddalik, tezlik va kod sifatiga asoslanadi. Har bir loyiha o'ziga xos muammolar yechimini talab qiladi va men doim eng to'g'ri texnik yechimlarni izlayman.
            </p>
            
            <div className="about__skills-section">
              <h3 className="about__skills-title">Texnologiyalar & Ko'nikmalar</h3>
              <div className="about__skills-categories">
                {SKILLS.map(group => (
                  <div key={group.title} className="about__skills-group">
                    <h4>{group.title}</h4>
                    <div className="about__skills-list">
                      {group.skills.map(skill => (
                        <span key={skill} className="skill-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="about__info-card-container">
            <div className="about__info-card">
              <div className="about__info-item">
                <span className="about__info-label">Joylashuv</span>
                <span className="about__info-value">Chust, Namangan, O'zbekiston</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Tillar</span>
                <span className="about__info-value">O'zbek, Ingliz</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Ish tarzi</span>
                <span className="about__info-value">Onlayn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title">Loyihalar</h2>
        <div className="projects__grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <a href={project.live} target="_blank" rel="noreferrer" className="project-card__cover-link" aria-label={project.title} />
              
              <div className="project-card__content">
                <h3 className="project-card__title">
                  {project.title}
                  <span className="project-card__arrow">↗</span>
                </h3>
                <p className="project-card__desc">{project.desc}</p>
              </div>
              <div className="project-card__footer">
                <div className="project-card__tags">
                  {project.tags
                    .flatMap(t => t.split(/[;,]/))
                    .map(t => t.trim())
                    .filter(Boolean)
                    .map(t => (
                      <span key={t} className="project-tag">{t}</span>
                    ))}
                </div>
                <a href={project.github} target="_blank" rel="noreferrer" className="project-card__github-link" title="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact__box">
          <h2 className="contact__title">Muloqot</h2>
          <p className="contact__desc">
            Yangi loyiha, ish yoki hamkorlik takliflari bo'yicha bog'lanish uchun xat yozishingiz mumkin.
          </p>
          <a href="mailto:forprosunnatillo.gmail.com" className="contact__link">
            forprosunnatillo.gmail.com
          </a>
          <div className="contact__socials">
            <a href="https://github.com/s22182414-dot" className="social-link" target="_blank" rel="noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', verticalAlign: 'middle'}}>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </a>
            <a href="/resume.pdf" download="Sunnatillo_Rustamshayev_CV.pdf" className="social-link" title="Rezyume yuklab olish">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', verticalAlign: 'middle'}}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Rezyume (CV)
            </a>
            <a href="https://t.me/s_numonivich" className="social-link" target="_blank" rel="noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', verticalAlign: 'middle'}}>
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
              </svg>
              Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ onNavigate }: { onNavigate: (path: string, e: React.MouseEvent) => void }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© 2026 Sunnatillo Rustamshayev</p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <p>Minimalist & Premium Portfolio</p>
          <a href="/admin" className="admin-footer-link" onClick={(e) => onNavigate('/admin', e)}>
            Admin panel
          </a>
        </div>
      </div>
    </footer>
  )
}

function Admin({ 
  projects, 
  setProjects, 
  onNavigate,
  adminPassword,
  onUnauthorized
}: { 
  projects: Project[]; 
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>; 
  onNavigate: (path: string, e?: React.MouseEvent) => void;
  adminPassword: string;
  onUnauthorized: () => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  
  // Form fields state
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [github, setGithub] = useState('');
  const [live, setLive] = useState('');
  
  // Validation state
  const [error, setError] = useState('');

  // When edit is clicked, populate fields
  const handleEditClick = (project: Project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDesc(project.desc);
    setTagsInput(project.tags.join(', '));
    setGithub(project.github);
    setLive(project.live);
    setError('');
  };

  // Cancel edit / reset form
  const handleCancel = () => {
    setEditingId(null);
    setTitle('');
    setDesc('');
    setTagsInput('');
    setGithub('');
    setLive('');
    setError('');
  };

  // Submit form (add or edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) {
      setError('Sarlavha va Tavsif maydonlari to\'ldirilishi shart.');
      return;
    }

    const parsedTags = tagsInput
      .split(/[;,]/)
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const updatedProjectData = {
      title: title.trim(),
      desc: desc.trim(),
      tags: parsedTags,
      github: github.trim() || '#',
      live: live.trim() || '#'
    };

    try {
      if (editingId) {
        // Editing
        const res = await fetch('/api/projects', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminPassword}`
          },
          body: JSON.stringify({ id: editingId, ...updatedProjectData })
        });

        if (res.status === 401) {
          onUnauthorized();
          return;
        }

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Xatolik yuz berdi.');
        }

        const updatedProject = await res.json();
        setProjects(prev => prev.map(p => p.id === editingId ? updatedProject : p));
      } else {
        // Adding new
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminPassword}`
          },
          body: JSON.stringify({ title: updatedProjectData.title, desc: updatedProjectData.desc, tags: updatedProjectData.tags, github: updatedProjectData.github, live: updatedProjectData.live })
        });

        if (res.status === 401) {
          onUnauthorized();
          return;
        }

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Xatolik yuz berdi.');
        }

        const newProject = await res.json();
        setProjects(prev => [...prev, newProject]);
      }
      handleCancel();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Trigger delete confirmation modal
  const handleDeleteTrigger = (id: string) => {
    setDeletingProjectId(id);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (deletingProjectId) {
      try {
        const res = await fetch(`/api/projects?id=${deletingProjectId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${adminPassword}`
          }
        });

        if (res.status === 401) {
          onUnauthorized();
          return;
        }

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Xatolik yuz berdi.');
        }

        setProjects(prev => prev.filter(p => p.id !== deletingProjectId));
        if (editingId === deletingProjectId) {
          handleCancel();
        }
      } catch (err: any) {
        setError(err.message);
      }
    }
    setShowDeleteModal(false);
    setDeletingProjectId(null);
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingProjectId(null);
  };

  return (
    <section className="admin-section">
      <div className="container">
        <div className="admin-header">
          <h1 className="admin-header__title">Admin Panel</h1>
          <a href="/" className="admin-back-link" onClick={(e) => onNavigate('/', e)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Asosiy sahifaga qaytish
          </a>
        </div>

        <div className="admin-grid">
          {/* Projects list */}
          <div className="admin-card">
            <h2 className="admin-card__title">Mavjud Loyihalar ({projects.length})</h2>
            <div className="admin-projects-list">
              {projects.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)' }}>
                  Hech qanday loyiha topilmadi.
                </p>
              ) : (
                projects.map(project => (
                  <div key={project.id} className="admin-project-item">
                    <div className="admin-project-item__header">
                      <h3 className="admin-project-item__title">{project.title}</h3>
                      <div className="admin-project-item__actions">
                        <button 
                          className="btn-icon" 
                          onClick={() => handleEditClick(project)} 
                          title="Tahrirlash"
                          aria-label={`Tahrirlash: ${project.title}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button 
                          className="btn-icon btn-icon--danger" 
                          onClick={() => handleDeleteTrigger(project.id)} 
                          title="O'chirish"
                          aria-label={`O'chirish: ${project.title}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="admin-project-item__desc">{project.desc}</p>
                    <div className="admin-project-item__footer">
                      {project.tags
                        .flatMap(t => t.split(/[;,]/))
                        .map(t => t.trim())
                        .filter(Boolean)
                        .map(t => (
                          <span key={t} className="admin-project-tag">{t}</span>
                        ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Form container */}
          <div className="admin-card">
            <h2 className="admin-card__title">
              {editingId ? 'Loyihani Tahrirlash' : 'Yangi Loyiha Qo\'shish'}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              {error && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '16px', fontWeight: 500 }}>
                  {error}
                </div>
              )}
              
              <div className="form-group">
                <label className="form-label" htmlFor="proj-title">Loyiha nomi *</label>
                <input 
                  id="proj-title"
                  type="text" 
                  className="form-input" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="Masalan: ShopFlow E-Commerce"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-desc">Tavsif *</label>
                <textarea 
                  id="proj-desc"
                  className="form-textarea" 
                  value={desc} 
                  onChange={e => setDesc(e.target.value)} 
                  placeholder="Loyiha haqida batafsil ma'lumot..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-tags">Texnologiyalar (vergul bilan ajratilgan)</label>
                <input 
                  id="proj-tags"
                  type="text" 
                  className="form-input" 
                  value={tagsInput} 
                  onChange={e => setTagsInput(e.target.value)} 
                  placeholder="React, Node.js, CSS"
                />
                <span className="form-help">Har bir texnologiyani vergul bilan ajrating</span>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-github">GitHub havola (URL)</label>
                <input 
                  id="proj-github"
                  type="text" 
                  className="form-input" 
                  value={github} 
                  onChange={e => setGithub(e.target.value)} 
                  placeholder="https://github.com/username/project"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="proj-live">Live Demo havola (URL)</label>
                <input 
                  id="proj-live"
                  type="text" 
                  className="form-input" 
                  value={live} 
                  onChange={e => setLive(e.target.value)} 
                  placeholder="https://project-demo.com"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn--primary">
                  {editingId ? 'Saqlash' : 'Qo\'shish'}
                </button>
                <button type="button" className="btn btn--secondary" onClick={handleCancel}>
                  {editingId ? 'Bekor qilish' : 'Tozalash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div className="custom-modal-overlay" onClick={handleCancelDelete}>
          <div className="custom-modal-content" onClick={e => e.stopPropagation()}>
            <h3 className="custom-modal-title">Loyihani o'chirish</h3>
            <p className="custom-modal-text">Haqiqatan ham ushbu loyihani o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.</p>
            <div className="custom-modal-actions">
              <button className="btn btn--danger" onClick={handleConfirmDelete}>O'chirish</button>
              <button className="btn btn--secondary" onClick={handleCancelDelete}>Bekor qilish</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================
// ADMIN LOGIN COMPONENT
// ============================================
function AdminLogin({ 
  onLogin, 
  error, 
  onNavigate 
}: { 
  onLogin: (pass: string) => void; 
  error: string;
  onNavigate: (path: string, e?: React.MouseEvent) => void;
}) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Admin Panel</h1>
        <p className="admin-login-subtitle">Tizimga kirish uchun maxfiy parolni kiriting</p>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="admin-login-error">{error}</div>}
          
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label" htmlFor="admin-pass">Admin paroli</label>
            <input 
              id="admin-pass"
              type="password" 
              className="form-input" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>
          
          <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: '16px' }}>
            Kirish
          </button>
          
          <a href="/" className="admin-back-link" style={{ marginTop: '24px', justifyContent: 'center', display: 'flex' }} onClick={(e) => onNavigate('/', e)}>
            Asosiy sahifaga qaytish
          </a>
        </form>
      </div>
    </div>
  );
}

// ============================================
// APP RENDER
// ============================================
export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return 'dark'
  })

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  
  // Admin auth states
  const [adminPassword, setAdminPassword] = useState<string | null>(() => localStorage.getItem('admin_password'))
  const [loginError, setLoginError] = useState<string>('')

  const [currentRoute, setCurrentRoute] = useState(window.location.pathname)

  // Fetch projects from DB
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/projects')
        if (!res.ok) {
          throw new Error('Ma\'lumotlarni yuklab bo\'lmadi')
        }
        const data = await res.json()
        setProjects(data)
      } catch (err: any) {
        console.error('Fetch error, falling back to local projects.json:', err)
        // Fallback to local projects.json
        const initial = PROJECTS.map((p, idx) => ({
          id: `project-${idx}-${Date.now()}`,
          title: p.title,
          desc: p.desc,
          tags: p.tags,
          github: p.github,
          live: p.live
        }))
        setProjects(initial)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextMenu)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') {
        e.preventDefault()
        return
      }
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault()
        return
      }
      if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault()
        return
      }
      if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault()
        return
      }
      if (e.ctrlKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault()
        return
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    const handleCopy = (e: Event) => {
      e.preventDefault()
    }
    document.addEventListener('copy', handleCopy)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('copy', handleCopy)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const navigateTo = (path: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    window.history.pushState(null, '', path)
    setCurrentRoute(path)
    if (path !== '/admin') {
      const sectionId = path.replace('/', '')
      const element = document.getElementById(sectionId || 'hero')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      setCurrentRoute(path)
      if (path !== '/admin') {
        const sectionId = path.replace('/', '')
        const element = document.getElementById(sectionId || 'hero')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    
    // Initial scroll on load
    const initialPath = window.location.pathname
    if (initialPath !== '/admin') {
      const initialSection = initialPath.replace('/', '')
      if (initialSection) {
        setTimeout(() => {
          const element = document.getElementById(initialSection)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 150)
      }
    }

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleLogin = (password: string) => {
    setAdminPassword(password)
    localStorage.setItem('admin_password', password)
    setLoginError('')
  }

  const handleUnauthorized = () => {
    setLoginError('Kiritilgan parol noto\'g\'ri!')
    setAdminPassword(null)
    localStorage.removeItem('admin_password')
  }

  const isAdmin = currentRoute === '/admin'

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} onNavigate={navigateTo} isAdmin={isAdmin} />
      <main>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <p style={{ color: 'var(--text-secondary)' }}>Loyihalar yuklanmoqda...</p>
          </div>
        ) : isAdmin ? (
          !adminPassword ? (
            <AdminLogin onLogin={handleLogin} error={loginError} onNavigate={navigateTo} />
          ) : (
            <Admin 
              projects={projects} 
              setProjects={setProjects} 
              onNavigate={navigateTo} 
              adminPassword={adminPassword} 
              onUnauthorized={handleUnauthorized} 
            />
          )
        ) : (
          <>
            <Hero onNavigate={navigateTo} />
            <About />
            <Projects projects={projects} />
            <Contact />
          </>
        )}
      </main>
      <Footer onNavigate={navigateTo} />
    </>
  )
}
