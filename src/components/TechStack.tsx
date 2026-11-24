import { portfolioData } from '../data/portfolio';

export default function TechStack() {
  const { skillset } = portfolioData.about;
  const groups = [{ title: 'Linguagens', values: skillset.languages }, { title: 'Frameworks', values: skillset.frameworks }, { title: 'Ferramentas', values: skillset.tools }, { title: 'Bancos de dados', values: skillset.databases }];
  return <section className="container"><div className="skills-grid">{groups.map(group => <div className="skill-group" key={group.title}><h3>{group.title}</h3><div className="tags">{group.values.map(value => <span className="tag" key={value}>{value}</span>)}</div></div>)}</div></section>;
}
