import { portfolioData } from '../data/portfolio';

export default function Navbar() {
  const { personal, contact } = portfolioData;
  return <header className="nav-wrap"><nav className="navbar container" aria-label="Navegação principal"><a className="brand" href="#home" aria-label={personal.name}>{personal.name.split(' ').slice(0, 2).join(' ')}<span>.</span></a><div className="nav-links"><a href="#about">Sobre</a><a href="#projects">Projetos</a><a href="#contact">Contato</a></div><a className="nav-cta" href={`mailto:${contact.email}`}>Vamos conversar <span>↗</span></a></nav></header>;
}
