export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  linkGitHub: string;
  linkDemo?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    typewriterRoles: string[];
    location: string;
  };
  hero: {
    greeting: string;
    headline: string;
    subheadline: string;
    positioning: string;
  };
  about: {
    title: string;
    introduction: string;
    bioParagraphs: string[];
    skillset: {
      languages: string[];
      frameworks: string[];
      tools: string[];
      databases: string[];
    };
  };
  projects: Project[];
  contact: {
    ctaHeadline: string;
    ctaDescription: string;
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Vinicius Marlin Santos Ribeiro",
    role: "Desenvolvedor Back-end Java & Spring Boot",
    typewriterRoles: [
      "Java Back-end Developer",
      "Software Engineering Student",
      "Spring Boot & REST APIs"
    ],
    location: "Salvador, Bahia - Brasil"
  },
  hero: {
    greeting: "Olá! Eu sou",
    headline: "Desenvolvendo APIs REST escaláveis e aplicações robustas com Java e Spring Boot.",
    subheadline: "Estudante de Engenharia de Software com forte base prática em infraestrutura de TI, resolução de incidentes e desenvolvimento back-end.",
    positioning: "Uno a vivência prática de ambientes corporativos críticos ao desenvolvimento de software estruturado em camadas, focado em código limpo e resiliência."
  },
  about: {
    title: "Sobre Mim",
    introduction: "Estudante de Engenharia de Software na UCSAL focado no ecossistema back-end (Java, Spring Boot e APIs REST), com experiência prática em infraestrutura de TI corporativa.",
    bioParagraphs: [
      "Desenvolvo projetos práticos que vão desde APIs RESTful estruturadas em camadas e integrações com plataformas corporativas (como Salesforce) até simulações focadas em Programação Orientada a Objetos pura, além de fundamentos em front-end com HTML5, CSS3, JavaScript e React.",
      "Paralelamente aos estudos, acumulo experiência hands-on em suporte técnico N2 e infraestrutura de TI — atuando na sede da Secretaria Municipal da Saúde (1 ano e 4 meses via Parque Social) e atualmente como Estagiário de TI na NCK Gestão da Informação. Essa vivência em ambientes de alto volume de chamados me trouxe visão sistêmica, resiliência e facilidade de comunicação em equipe."
    ],
    skillset: {
      languages: [
        "Java",
        "JavaScript",
        "TypeScript",
        "Python",
        "SQL",
        "HTML5",
        "CSS3"
      ],
      frameworks: [
        "Spring Boot",
        "Spring Data JPA",
        "Spring Security",
        "React"
      ],
      tools: [
        "Git",
        "GitHub",
        "Docker",
        "Maven",
        "Oracle BI"
      ],
      databases: [
        "PostgreSQL",
        "H2 Database"
      ]
    }
  },
  projects: [
    {
      id: "salesforce-internet-monitor",
      title: "Salesforce Internet Monitor",
      description: "API de monitoramento contínuo de disponibilidade de rede desenvolvida para resolver um problema real de infraestrutura. Detecta falhas de conexão em alvos monitorados, calcula o tempo total de indisponibilidade (downtime) e integra-se automaticamente à API do Salesforce para registrar o incidente assim que o serviço é restabelecido.",
      tags: ["Java", "Spring Boot", "Salesforce API", "REST API", "Render"],
      linkGitHub: "https://github.com/viniciusmarlin/salesforce-internetmonitor",
      linkDemo: "https://salesforce-internetmonitor.onrender.com/"
    },
    {
      id: "library-management-api",
      title: "Library Management API",
      description: "API RESTful para gerenciamento completo de acervo, usuários e empréstimos de biblioteca. Estruturada em arquitetura em camadas com regras de negócio desacopladas e persistência de dados.",
      tags: ["Java", "Spring Boot", "Spring Data JPA", "REST API", "PostgreSQL"],
      linkGitHub: "https://github.com/viniciusmarlin/library-management-api",
      linkDemo: ""
    },
    {
      id: "task-manager-api",
      title: "Task Manager API",
      description: "Serviço back-end para organização e controle de tarefas, implementando operações CRUD completas, validação de dados, controle de acesso e conteinerização.",
      tags: ["Java", "Spring Boot", "Spring Security", "Docker", "H2 Database"],
      linkGitHub: "https://github.com/viniciusmarlin/task-manager-api",
      linkDemo: ""
    },
    {
      id: "java-oop-exercises",
      title: "Java OOP & Simulações",
      description: "Repositório dedicado à modelagem de domínios e simulações utilizando Programação Orientada a Objetos pura em Java, aplicando encapsulamento, herança, polimorfismo e boas práticas.",
      tags: ["Java", "POO", "Estruturas de Dados", "Git"],
      linkGitHub: "https://github.com/viniciusmarlin/java-oop-exercises",
      linkDemo: ""
    }
  ],
  contact: {
    ctaHeadline: "Entre em Contato",
    ctaDescription: "Busco minha primeira oportunidade como estagiário ou desenvolvedor júnior (foco em back-end Java). Vamos conversar sobre tecnologia, projetos ou oportunidades!",
    email: "viniciusmarlinpessoal@gmail.com",
    github: "https://github.com/viniciusmarlin",
    linkedin: "https://www.linkedin.com/in/viniciusmarlin/",
    twitter: ""
  }
};
