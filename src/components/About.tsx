import { portfolioData } from '../data/portfolio';

export default function About() {
  const { about } = portfolioData;
  return <section className="section container" id="about"><div className="section-heading"><span className="section-index">01 / SOBRE</span><h2>{about.title}<span className="accent">.</span></h2></div><div className="about-grid"><div className="about-lead"><p>{about.introduction}</p><div className="about-rule"/><span className="about-caption">Curiosidade, consistência e engenharia aplicada.</span></div><div className="about-body">{about.bioParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div></section>;
}
