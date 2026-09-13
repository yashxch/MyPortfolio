export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  type: string;
  period: string;
  location: string;
  status?: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  code?: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "algoshack",
    role: "Software Development Intern",
    organization: "Algoshack",
    type: "Internship",
    period: "Dec 2025 — Mar 2026",
    location: "Remote",
    status: "Completed",
    description:
      "Developed automation scripts using XPath-based element identification to validate web application workflows, explored AI-driven automation approaches to reduce manual intervention, and collaborated on scripted validation frameworks.",
    highlights: [
      "Developed automation scripts using XPath-based element identification to validate web application workflows and execute automated test cases.",
      "Explored AI-driven automation approaches to reduce manual intervention in software testing processes.",
      "Collaborated on automation and quality assurance activities using scripted validation frameworks."
    ],
    technologies: ["Python", "XPath", "AI-Driven Automation", "Test Automation", "Scripted QA Frameworks"]
  },
  {
    id: "nwc",
    role: "Organizing Co-Lead",
    organization: "NWC Association, SRM IST",
    type: "Leadership",
    period: "May 2025 — Present",
    location: "Chennai, India",
    status: "Active",
    description:
      "Leading planning and execution of departmental events engaging 200+ students and faculty members, coordinating technical workshops, and managing cross-functional team logistics.",
    highlights: [
      "Led planning and execution of departmental events engaging 200+ students and faculty members.",
      "Coordinated technical workshops focused on cybersecurity, software engineering, and emerging technologies.",
      "Managed logistics, stakeholder communication, and cross-functional collaboration."
    ],
    technologies: ["Event Planning & Logistics", "Technical Workshops", "Cybersecurity", "Software Engineering", "Cross-Functional Collaboration"]
  }
];

export const EDUCATION = {
  institution: "SRM Institute of Science and Technology",
  location: "Chennai, India",
  degree: "B.Tech in Computer Science and Engineering",
  period: "2023 — May 2027",
  status: "Expected May 2027",
  metrics: [
    { label: "Cumulative CGPA", value: "8.09", sub: "Out of 10.0 scale" },
    { label: "Expected Graduation", value: "May 2027", sub: "Bachelor of Technology" },
    { label: "Institution", value: "SRM IST", sub: "Chennai, India" }
  ],
  coursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Operating Systems",
    "Computer Networks",
    "Database Management Systems",
    "Cryptography & Network Security",
    "Cloud Computing & DevOps",
    "Software Engineering"
  ]
};

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "sap-da",
    title: "SAP Data Analyst Certification",
    issuer: "SAP",
    year: "2026",
    code: "SAP-DA-2026"
  }
];

export const LEADERSHIP_PIPELINE = [
  { step: "01", stage: "Problem Framing & Theme", detail: "Identifying high-relevance technical subjects in software systems and cybersecurity." },
  { step: "02", stage: "Speaker & Lab Logistics", detail: "Hands-on syllabus development, cloud sandbox provisioning, and lab dry-runs." },
  { step: "03", stage: "Community Outreach", detail: "Targeted announcements across SRMIST CSE cohorts and technical clubs." },
  { step: "04", stage: "Live Execution", detail: "Real-time orchestration of 200+ attendees, interactive sessions, and technical troubleshooting." },
  { step: "05", stage: "Retrospective & Open Sourcing", detail: "Gathering participant metrics, publishing learning resources, and post-event analysis." }
];
