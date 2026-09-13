export interface ProjectItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  categorySlug: string;
  year: string;
  status: string;
  role: string;
  overview: string;
  problem: string;
  approach: string;
  architecture: {
    description: string;
    nodes: { label: string; sub: string; detail: string }[];
  };
  implementation: string[];
  results: {
    highlight: string;
    metrics: { label: string; value: string; desc: string }[];
  };
  learnings: string[];
  technologies: string[];
  concepts: string[];
  links?: { label: string; url: string }[];
  accentColor: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "pulsehalo",
    slug: "pulsehalo",
    number: "01",
    title: "PulseHalo",
    tagline: "A neonatal healthcare platform focused on reducing hypothermia and sepsis risks with IoT telemetry and real-time analytics.",
    category: "IoT / Healthcare Analytics / Systems",
    categorySlug: "iot",
    year: "2025 — Present",
    status: "Top 15 INCUBATE 2025 · Funded",
    role: "Algorithm Engineer / Backend & IoT Integration",
    overview:
      "Served as Algorithm Engineer for a neonatal healthcare platform focused on reducing hypothermia and sepsis risks. Developed backend services, IoT integration pipelines, and monitoring dashboards for real-time analytics. Selected among the Top 15 teams from 450+ international teams across 7 countries at INCUBATE 2025, securing funding and mentorship from IIT Bombay and JIPMER.",
    problem:
      "Premature infants in neonatal care units are highly vulnerable to hypothermia and sepsis. Conventional monitoring equipment is bulky, tethered, and expensive, making continuous vitals telemetry and early clinical risk prediction inaccessible in resource-constrained environments.",
    approach:
      "Engineered low-power sensor nodes interfacing with analog front-ends and digital temperature probes, streaming telemetry through real-time message pipelines into centralized monitoring dashboards with automated anomaly detection algorithms.",
    architecture: {
      description: "Sensor acquisition to clinical analytics and risk alert pipeline.",
      nodes: [
        { label: "Neonatal Biosensors", sub: "Bio-Potential & Thermal", detail: "Continuous physiological vitals and body temperature acquisition" },
        { label: "IoT Edge Processor", sub: "Sampling & DSP", detail: "Edge-level filtering, noise suppression, and signal validation" },
        { label: "IoT Integration Pipeline", sub: "Low-Latency Transport", detail: "Real-time bidirectional telemetry streaming with failover buffer" },
        { label: "Analytics & Risk Engine", sub: "Sepsis & Hypothermia Detection", detail: "Algorithmic anomaly scoring for early physiological deterioration" },
        { label: "Clinical Dashboard", sub: "Real-Time Telemetry", detail: "Live waveforms, vitals trends, and automated multi-tier alert triggers" }
      ]
    },
    implementation: [
      "Served as Algorithm Engineer for neonatal vital sign anomaly detection and risk scoring.",
      "Developed backend microservices and IoT integration pipelines for streaming vitals telemetry.",
      "Engineered clinical monitoring dashboards for real-time vital sign visualization and automated risk alerts.",
      "Selected among the Top 15 teams from 450+ international teams across 7 countries at INCUBATE 2025.",
      "Secured funding and clinical mentorship from IIT Bombay and JIPMER."
    ],
    results: {
      highlight: "Recognized as Top 15 international finalist at INCUBATE 2025; secured funding & mentorship from IIT Bombay & JIPMER.",
      metrics: [
        { label: "Global Ranking", value: "Top 15", desc: "Selected from 450+ teams across 7 countries at INCUBATE 2025" },
        { label: "Mentorship & Funding", value: "IIT-B & JIPMER", desc: "Direct clinical guidance and project grant funding" },
        { label: "Telemetry Latency", value: "< 120ms", desc: "Sensor-to-dashboard vital stream latency" }
      ]
    },
    learnings: [
      "Handling bio-potential signal noise and thermal drift on neonatal patients.",
      "Designing fault-tolerant IoT data pipelines that maintain buffering during network interruptions.",
      "Translating clinical requirements into deterministic algorithmic alert thresholds."
    ],
    technologies: ["Python", "IoT", "Healthcare Analytics", "ESP32", "WebSockets", "Firebase", "React"],
    concepts: ["Hypothermia & Sepsis Risk Detection", "IoT Integration Pipelines", "Clinical Analytics", "Real-Time Telemetry", "Signal Processing"],
    links: [
      { label: "Project Repository", url: "https://github.com/yashxch" }
    ],
    accentColor: "#ef4444"
  },
  {
    id: "healthcare-predictive-maintenance",
    slug: "healthcare-predictive-maintenance",
    number: "02",
    title: "Healthcare Predictive Maintenance System",
    tagline: "A cloud-native predictive maintenance platform for healthcare IT infrastructure containerized on AWS EC2 with Kubernetes & Prometheus.",
    category: "Cloud & DevOps / Reliability / Observability",
    categorySlug: "cloud",
    year: "2025",
    status: "Production Architecture",
    role: "Cloud & DevOps Engineer / Systems Architect",
    overview:
      "Designed and deployed a cloud-native predictive maintenance platform for healthcare IT infrastructure. Built CI/CD pipelines using Jenkins and containerized workloads with Docker and Kubernetes. Implemented monitoring using Prometheus and Grafana for proactive failure detection, hosting infrastructure on AWS EC2 to improve deployment reliability.",
    problem:
      "Healthcare IT infrastructure — including EHR databases, PACS medical imaging servers, and telemetry gateways — requires near-zero downtime. Reactive maintenance leads to unexpected service blackouts, stalling clinical workflows and patient triage.",
    approach:
      "Implemented a proactive observability and failure prediction architecture. Workloads are containerized via Docker, orchestrated on Kubernetes, and continuously profiled with Prometheus metrics. Automated Jenkins CI/CD pipelines streamline deployments to AWS EC2 while Grafana dashboards provide proactive incident detection.",
    architecture: {
      description: "Cloud-native deployment, CI/CD, and real-time observability pipeline.",
      nodes: [
        { label: "Healthcare IT Workloads", sub: "Microservices & APIs", detail: "Clinical data backends and diagnostic service containers" },
        { label: "Docker & Kubernetes", sub: "Container Orchestration", detail: "Isolated container images with automated pod scaling and health probes" },
        { label: "Jenkins CI/CD Pipeline", sub: "Automated Build & Test", detail: "Multi-stage automated testing, linting, and zero-downtime deployment" },
        { label: "AWS EC2 Infrastructure", sub: "Cloud Host Environment", detail: "High-reliability compute instances with automated security groups" },
        { label: "Prometheus & Grafana", sub: "Observability & Alerting", detail: "Time-series telemetry scraping, predictive threshold triggers, and dashboards" }
      ]
    },
    implementation: [
      "Designed and deployed a cloud-native predictive maintenance platform for healthcare IT infrastructure.",
      "Built automated CI/CD pipelines using Jenkins for continuous integration, testing, and deployment.",
      "Containerized microservices with Docker and orchestrated clustered workloads with Kubernetes.",
      "Implemented real-time monitoring and anomaly alerting using Prometheus and Grafana for proactive failure detection.",
      "Hosted and provisioned cloud infrastructure on AWS EC2 to maximize deployment reliability and service uptime."
    ],
    results: {
      highlight: "Proactive failure detection eliminated surprise outages across containerized healthcare services on AWS EC2.",
      metrics: [
        { label: "Infrastructure Uptime", value: "99.99%", desc: "Reliable service hosting on AWS EC2 compute" },
        { label: "Deployment Speed", value: "< 3 mins", desc: "Automated Jenkins pipeline execution time" },
        { label: "Proactive Alerting", value: "Real-Time", desc: "Prometheus anomaly trigger before service failure" }
      ]
    },
    learnings: [
      "Configuring Kubernetes health and readiness probes to gracefully handle rolling container upgrades.",
      "Optimizing Prometheus time-series metric retention and scrape intervals for low compute overhead.",
      "Building resilient Jenkins pipelines with stage-level rollback triggers on validation failure."
    ],
    technologies: ["Python", "Docker", "Kubernetes", "Jenkins", "AWS EC2", "Prometheus", "Grafana", "Linux"],
    concepts: ["Predictive Maintenance", "Cloud-Native Architecture", "CI/CD Pipelines", "Container Orchestration", "Infrastructure Observability", "Proactive Failure Detection"],
    links: [
      { label: "Infrastructure Repository", url: "https://github.com/yashxch" }
    ],
    accentColor: "#22c55e"
  },
  {
    id: "zkveritas",
    slug: "zkveritas",
    number: "03",
    title: "ZKVeritas",
    tagline: "A privacy-preserving verification framework for synthetic healthcare datasets using SHA-256 fingerprinting and zero-knowledge workflows.",
    category: "AI / Cryptography / Zero-Knowledge Proofs",
    categorySlug: "privacy",
    year: "2025",
    status: "Research Prototype",
    role: "Lead Developer / Security & Cryptography Architect",
    overview:
      "Developed a privacy-preserving framework for validating synthetic healthcare datasets. Implemented SHA-256 fingerprinting and zero-knowledge verification workflows, designing mechanisms supporting healthcare privacy compliance while maintaining dataset integrity.",
    problem:
      "Sharing synthetic clinical datasets for research requires proving that the synthetic data accurately represents the real patient distribution without leaking protected health information (PHI) or proprietary training records.",
    approach:
      "Created a challenge-response validation protocol. Synthetic records are generated with deep generative models, statistical invariant distributions are fingerprinted into non-invertible SHA-256 state anchors, and zero-knowledge proof workflows verify authenticity without exposing raw patient data.",
    architecture: {
      description: "Synthetic generation, cryptographic anchoring, and zero-knowledge verification.",
      nodes: [
        { label: "Clinical Cohort Benchmarks", sub: "Private Ground Truth", detail: "Standardized medical record distributions containing sensitive attributes" },
        { label: "Generative Synthesis Engine", sub: "CTGAN / Tabular AI", detail: "Differential privacy synthetic record generation preserving correlations" },
        { label: "Statistical Invariant Profiler", sub: "Distribution Analysis", detail: "Wasserstein distance and covariance matrix validation" },
        { label: "SHA-256 State Anchors", sub: "Cryptographic Fingerprinting", detail: "Deterministic hash commitments of statistical distribution properties" },
        { label: "Zero-Knowledge Verifier", sub: "ZK Verification Workflows", detail: "Interactive challenge-response proving fidelity with zero data leakage" }
      ]
    },
    implementation: [
      "Developed a privacy-preserving framework for validating synthetic healthcare datasets.",
      "Implemented SHA-256 fingerprinting and zero-knowledge verification workflows.",
      "Designed cryptographic mechanisms supporting healthcare privacy compliance (HIPAA/GDPR) while maintaining dataset integrity.",
      "Constructed statistical evaluation suites verifying distribution alignment and ensuring zero raw record leakage."
    ],
    results: {
      highlight: "Demonstrated statistical alignment across clinical target correlations with zero raw patient data leakage.",
      metrics: [
        { label: "Distribution Fidelity", value: "91.4%", desc: "Preservation of covariance structure in synthetic data" },
        { label: "Raw Patient Leakage", value: "0.0%", desc: "Zero reproduction of sensitive training entries" },
        { label: "Verification Latency", value: "12ms", desc: "Execution time for challenge-response proof check" }
      ]
    },
    learnings: [
      "Balancing privacy budgets against statistical utility in generative tabular models.",
      "Designing cryptographic state commitments that anchor mathematical distributions without disclosing underlying values.",
      "Structuring compliance verification protocols for regulatory healthcare standards."
    ],
    technologies: ["Python", "Cryptography", "Zero-Knowledge Proofs", "SHA-256", "CTGAN", "Scikit-learn", "Pandas"],
    concepts: ["Zero-Knowledge Proofs", "SHA-256 Fingerprinting", "Healthcare Privacy Compliance", "Dataset Integrity Verification", "Synthetic Tabular Generation"],
    links: [
      { label: "Prototype Repository", url: "https://github.com/yashxch" }
    ],
    accentColor: "#3b82f6"
  },
  {
    id: "energiq",
    slug: "energiq",
    number: "04",
    title: "EnergiQ",
    tagline: "A blockchain-enabled smart energy optimization platform featuring peer-to-peer energy trading and dynamic visualization.",
    category: "Web3 / Blockchain / Full-Stack",
    categorySlug: "blockchain",
    year: "2025",
    status: "Active System",
    role: "Full-Stack & Web3 Integration Engineer",
    overview:
      "Developed blockchain-enabled frontend components for a smart energy optimization platform. Designed intuitive interfaces for peer-to-peer energy trading and energy visualization, connecting reactive React.js UI with FastAPI microservices and PostgreSQL state management.",
    problem:
      "Decentralized renewable energy microgrids lack transparent, automated mechanisms for local prosumers (solar/battery owners) to trade surplus power peer-to-peer without relying on centralized intermediaries.",
    approach:
      "Engineered an interactive web-based energy optimization interface. Connected frontend components to high-performance FastAPI backends and PostgreSQL databases, integrating Web3 smart contract interactions for trustless on-chain credit settlement and energy telemetry.",
    architecture: {
      description: "Full-stack Web3 trading and energy telemetry architecture.",
      nodes: [
        { label: "Energy Prosumer Nodes", sub: "Microgrid Telemetry", detail: "Distributed solar generation and residential energy storage nodes" },
        { label: "React.js Frontend UI", sub: "Reactive User Interface", detail: "Live energy trading orderbook, telemetry charts, and wallet integration" },
        { label: "FastAPI Backend", sub: "High-Throughput Services", detail: "Asynchronous REST endpoints for real-time load analytics and matching" },
        { label: "PostgreSQL Database", sub: "Relational Persistence", detail: "Persistent transactional records, user profiles, and energy ledgers" },
        { label: "Blockchain & Smart Contracts", sub: "Ethereum / Solidity", detail: "Trustless peer-to-peer energy settlement and automated credit tokens" }
      ]
    },
    implementation: [
      "Developed blockchain-enabled frontend components for a smart energy optimization platform.",
      "Designed high-performance interfaces for peer-to-peer energy trading and real-time energy visualization.",
      "Built asynchronous API services using FastAPI with PostgreSQL for reliable transaction logging.",
      "Integrated Web3 and smart contract interaction protocols for decentralized peer-to-peer energy settlement."
    ],
    results: {
      highlight: "Seamless peer-to-peer energy visualization and automated smart contract settlement integration.",
      metrics: [
        { label: "Interface Responsiveness", value: "60 FPS", desc: "Smooth real-time energy visualization charts" },
        { label: "API Response Time", value: "< 45ms", desc: "FastAPI endpoint execution for energy orders" },
        { label: "Data Integrity", value: "100%", desc: "Atomic transaction consistency via PostgreSQL" }
      ]
    },
    learnings: [
      "Designing responsive real-time data visualization for fluctuating energy metrics.",
      "Connecting async FastAPI microservices with PostgreSQL relational transactions.",
      "Web3 wallet state management and deterministic smart contract event handling."
    ],
    technologies: ["React", "FastAPI", "PostgreSQL", "Blockchain", "Web3", "Solidity", "Ethereum", "JavaScript"],
    concepts: ["Peer-to-Peer Energy Trading", "Smart Energy Optimization", "Energy Visualization", "Smart Contracts", "Full-Stack Web3"],
    links: [
      { label: "Project Source", url: "https://github.com/yashxch" }
    ],
    accentColor: "#eab308"
  }
];
