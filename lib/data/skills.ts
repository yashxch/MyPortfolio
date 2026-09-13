export interface SkillCategory {
  title: string;
  code: string;
  description: string;
  items: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "LANGUAGES",
    code: "SYS.LANG",
    description: "Core languages for systems, backend microservices, and application logic.",
    items: ["Python", "C", "C++", "SQL", "JavaScript"]
  },
  {
    title: "WEB & BLOCKCHAIN",
    code: "SYS.WEB3",
    description: "Reactive web interfaces, smart contract protocols, and decentralized systems.",
    items: ["React.js", "Web3", "Solidity", "Ethereum", "Smart Contracts"]
  },
  {
    title: "CLOUD & DEVOPS",
    code: "SYS.OPS",
    description: "Containerization, cluster orchestration, CI/CD pipelines, and infrastructure observability.",
    items: ["AWS EC2", "Docker", "Kubernetes", "Jenkins", "Prometheus", "Grafana"]
  },
  {
    title: "DATABASES",
    code: "SYS.DATA",
    description: "High-concurrency relational data storage and transactional databases.",
    items: ["PostgreSQL"]
  },
  {
    title: "TOOLS",
    code: "SYS.TOOL",
    description: "Version control, Linux environments, and core engineering toolchains.",
    items: ["Git", "Linux"]
  },
  {
    title: "CONCEPTS",
    code: "SYS.CORE",
    description: "Fundamental computer science theory, cryptographic primitives, and security verification.",
    items: ["DSA", "OOP", "Cryptography", "Zero-Knowledge Proofs"]
  }
];

export interface ConnectedPipeline {
  triggerSkill: string;
  pipeline: string[];
  context: string;
}

export const CONNECTED_PIPELINES: ConnectedPipeline[] = [
  {
    triggerSkill: "Docker",
    pipeline: ["Docker", "Kubernetes", "Jenkins", "AWS EC2", "Grafana"],
    context: "Containerize workloads → Deploy to K8s cluster → Automated Jenkins CI/CD → Host on AWS EC2 → Telemetry on Grafana."
  },
  {
    triggerSkill: "Kubernetes",
    pipeline: ["Docker", "Kubernetes", "AWS EC2", "Prometheus", "Grafana"],
    context: "Container deployment → Pod orchestration on AWS EC2 → Prometheus metrics collection → Grafana failure dashboards."
  },
  {
    triggerSkill: "Jenkins",
    pipeline: ["Git", "Jenkins", "Docker", "Kubernetes", "AWS EC2"],
    context: "Code commit trigger → Automated Jenkins build & test → Containerization → Production deployment to AWS EC2."
  },
  {
    triggerSkill: "Python",
    pipeline: ["Python", "Cryptography", "Zero-Knowledge Proofs", "SHA-256", "Healthcare Analytics"],
    context: "Synthetic dataset generation → SHA-256 fingerprinting → Zero-knowledge verification protocol execution."
  },
  {
    triggerSkill: "React.js",
    pipeline: ["React.js", "FastAPI", "PostgreSQL", "Web3", "Ethereum"],
    context: "Reactive frontend dashboard → REST microservices → PostgreSQL state store → Trustless smart contract settlement."
  },
  {
    triggerSkill: "Zero-Knowledge Proofs",
    pipeline: ["Healthcare Data", "CTGAN", "SHA-256", "Zero-Knowledge Proofs", "Privacy Compliance"],
    context: "Clinical data synthesis → State commitments → Authenticity proof challenge → Zero raw row leakage."
  },
  {
    triggerSkill: "AWS EC2",
    pipeline: ["AWS EC2", "Docker", "Kubernetes", "Prometheus", "Grafana"],
    context: "Cloud infrastructure provisioning → Scalable service hosting → Proactive telemetry and health monitoring."
  },
  {
    triggerSkill: "PostgreSQL",
    pipeline: ["React.js", "FastAPI", "PostgreSQL", "Solidity", "Smart Contracts"],
    context: "High-throughput transaction logging → Relational data integrity → On-chain settlement reconciliation."
  },
  {
    triggerSkill: "Prometheus",
    pipeline: ["Kubernetes", "Prometheus", "Grafana", "Failure Detection", "Alerting"],
    context: "Cluster telemetry scraping → Time-series metric aggregation → Real-time alert triggers for proactive maintenance."
  }
];
