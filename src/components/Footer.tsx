import { ArrowUpRight, CodeXml, BriefcaseBusiness, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export default function Footer() {
  const { contact, personal } = portfolioData;
  return <footer className="footer" id="contact"><div className="container"><span className="section-index">03 / CONTATO</span><div className="footer-main"><div><h2>{contact.ctaHeadline}<span className="accent">.</span></h2><p>{contact.ctaDescription}</p></div><a className="button button-primary" href={`mailto:${contact.email}`}>Enviar um e-mail <ArrowUpRight size={17}/></a></div><div className="footer-bottom"><a className="brand" href="#home">{personal.name.split(' ').slice(0, 2).join(' ')}<span>.</span></a><span>© {new Date().getFullYear()} {personal.name}</span><div className="footer-socials"><a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub"><CodeXml size={17}/></a><a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness size={17}/></a><a href={`mailto:${contact.email}`} aria-label="E-mail"><Mail size={17}/></a></div></div></div></footer>;
}
