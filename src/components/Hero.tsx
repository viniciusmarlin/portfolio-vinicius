import { useEffect, useState } from 'react';
import { ArrowDown, CodeXml, BriefcaseBusiness, Download, FileText, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const codeLines = [
  [{ text: 'public class ', className: 'code-keyword' }, { text: 'Developer', className: 'code-type' }, { text: ' {' }],
  [{ text: '  private final ', className: 'code-keyword' }, { text: 'String focus =' }],
  [{ text: '  "building useful things"', className: 'code-string' }, { text: ';' }],
  [],
  [{ text: '  void ', className: 'code-keyword' }, { text: 'create', className: 'code-type' }, { text: '() {' }],
  [{ text: '    learn(); build(); improve();' }],
  [{ text: '  }' }],
  [{ text: '}' }]
];
const codeLength = codeLines.reduce((sum, line) => sum + line.reduce((lineSum, part) => lineSum + part.text.length, 0) + 1, 0);

export default function Hero() {
  const { personal, hero, contact, resume } = portfolioData;
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [typedRole, setTypedRole] = useState('');
  const [typedCode, setTypedCode] = useState(0);

  useEffect(() => {
    if (!resumeMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.resume-picker')) {
        setResumeMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setResumeMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [resumeMenuOpen]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      setTypedName(personal.name);
      setTypedRole(personal.role);
      setTypedCode(codeLength);
      return;
    }
    let nameIndex = 0;
    let codeIndex = 0;
    let roleIndex = 0;
    let deleting = false;
    let roleTimer: number | undefined;
    let codeTimer: number | undefined;
    const nameTimer = window.setInterval(() => {
      nameIndex += 1;
      setTypedName(personal.name.slice(0, nameIndex));
      if (nameIndex >= personal.name.length) {
        window.clearInterval(nameTimer);
        roleTimer = window.setTimeout(() => {
          codeTimer = window.setInterval(() => {
            codeIndex += 1;
            setTypedCode(codeIndex);
            if (codeIndex >= codeLength) {
              window.clearInterval(codeTimer);
              roleTimer = window.setTimeout(typeRole, 320);
            }
          }, 17);
        }, 220);
      }
    }, 42);
    const typeRole = () => {
      const full = personal.role;
      const roleInterval = window.setInterval(() => {
        roleIndex += deleting ? -1 : 1;
        setTypedRole(full.slice(0, roleIndex));
        if (!deleting && roleIndex >= full.length) {
          window.clearInterval(roleInterval);
          deleting = true;
          roleTimer = window.setTimeout(typeRole, 1300);
        } else if (deleting && roleIndex <= 0) {
          window.clearInterval(roleInterval);
          deleting = false;
          roleTimer = window.setTimeout(typeRole, 280);
        }
      }, deleting ? 38 : 78);
      roleTimer = roleInterval;
    };
    const finishForReducedMotion = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      window.clearInterval(nameTimer);
      if (codeTimer) window.clearInterval(codeTimer);
      if (roleTimer) window.clearTimeout(roleTimer);
      setTypedName(personal.name);
      setTypedRole(personal.role);
      setTypedCode(codeLength);
    };
    reducedMotion.addEventListener('change', finishForReducedMotion);
    return () => {
      window.clearInterval(nameTimer);
      if (codeTimer) window.clearInterval(codeTimer);
      if (roleTimer) { window.clearInterval(roleTimer); window.clearTimeout(roleTimer); }
      reducedMotion.removeEventListener('change', finishForReducedMotion);
    };
  }, [personal.name, personal.role]);

  let codePosition = 0;
  return <section className="hero container" id="home"><div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> Disponível para oportunidades <span className="eyebrow-line" /></div><p className="greeting">{hero.greeting}</p><h1 aria-label={`${personal.name}.`}><span className="typewriter-shell" aria-hidden="true"><span className="typewriter-placeholder">{personal.name}</span><span className="typewriter-value">{typedName}<i className="typing-caret"/></span></span><span className="accent">.</span></h1><p className="hero-role" aria-label={personal.role}>{typedRole}<i className="typing-caret" aria-hidden="true"/></p><p className="hero-description">{hero.headline}</p><p className="hero-position">{hero.positioning}</p><div className="hero-actions"><a className="button button-primary" href="#projects">Explorar projetos <ArrowDown size={16}/></a><div className="resume-picker"><button className="button button-outline resume-trigger" type="button" aria-expanded={resumeMenuOpen} aria-haspopup="true" onClick={() => setResumeMenuOpen((open) => !open)}><FileText size={16}/>Currículo<ChevronDown size={15}/></button>{resumeMenuOpen && <div className="resume-options"><a href={resume.url} target="_blank" rel="noreferrer" onClick={() => setResumeMenuOpen(false)}><FileText size={15}/>{resume.viewLabel}</a><a href={resume.url} download onClick={() => setResumeMenuOpen(false)}><Download size={15}/>{resume.downloadLabel}</a></div>}</div><a className="icon-button" href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub"><CodeXml size={18}/></a><a className="icon-button" href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness size={18}/></a></div><p className="location">{personal.location}</p></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-glow"/><div className="code-card"><div className="code-top"><span/><span/><span/><b>developer.java</b></div><div className="code-lines">{codeLines.map((line, index) => { const start = codePosition; const textLength = line.reduce((sum, part) => sum + part.text.length, 0); codePosition += textLength + 1; return <p key={index}><i>{String(index + 1).padStart(2, '0')}</i>{line.map((part, partIndex) => { const partStart = start + line.slice(0, partIndex).reduce((sum, previous) => sum + previous.text.length, 0); return <span className={part.className} key={partIndex}>{part.text.slice(0, Math.max(0, typedCode - partStart))}</span>; })}</p>; })}</div><div className="code-footer"><span>●</span> Java &nbsp; · &nbsp; Spring Boot</div></div><div className="floating-chip chip-top">⌘&nbsp; Clean code</div><div className="floating-chip chip-bottom">✦&nbsp; REST APIs</div></div></section>;
}
