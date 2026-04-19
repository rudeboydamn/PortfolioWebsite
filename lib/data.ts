import { SkillCategory, Skill, WorkItem, Service, ImplProject, NavItem } from './types';

export const skills: Record<SkillCategory, Skill[]> = {
  data: [
    { n: "SQL / Power BI / DAX", p: 95 },
    { n: "Python / Pandas", p: 92 },
    { n: "Data Warehousing", p: 90 },
    { n: "ETL Pipelines", p: 92 },
    { n: "dbt / Data Modeling", p: 88 },
  ],
  edi: [
    { n: "EDI X12", p: 90 },
    { n: "AS2 / SFTP", p: 85 },
    { n: "Partner Onboarding", p: 88 },
    { n: "Integrated Payables", p: 85 },
    { n: "Process Mapping", p: 90 },
  ],
  relations: [
    { n: "Stakeholder Management", p: 95 },
    { n: "Client Communication", p: 92 },
    { n: "Cross-functional Collaboration", p: 90 },
    { n: "Requirements Gathering", p: 88 },
    { n: "Training & Documentation", p: 85 },
  ],
  frontend: [
    { n: "HTML", p: 90 },
    { n: "CSS", p: 85 },
    { n: "JavaScript", p: 80 },
    { n: "React", p: 75 },
    { n: "TypeScript", p: 70 },
  ],
  design: [
    { n: "Figma", p: 85 },
    { n: "UI Design", p: 80 },
    { n: "UX Research", p: 75 },
  ],
  backend: [
    { n: "Python", p: 80 },
    { n: "PLpgSQL", p: 75 },
    { n: "SQL", p: 85 },
    { n: "Swift", p: 65 },
  ],
};

export const works: WorkItem[] = [
  { id: 1, title: "SteadFast iOS App", url: "https://github.com/rudeboydamn/SteadFast", type: "iOS App" },
  { id: 2, title: "dammyhenry.com", url: "https://dammyhenry.com", type: "Web Design" },
  { id: 3, title: "Vale CRM", url: "https://github.com/rudeboydamn/valecrm", type: "iOS App" },
  { id: 4, title: "Keystonevale.org", url: "https://keystonevale.org", type: "Brand Design" },
  { id: 5, title: "Keystone Vale CRM", url: "https://keystonevale.org/crm", type: "CRM System" },
];

export const services: Service[] = [
  {
    icon: "analysis",
    title: "Business<br>Analysis",
    items: ["Requirements Gathering", "Process Documentation", "Stakeholder Management", "Gap Analysis", "Solution Design"],
  },
  {
    icon: "setting",
    title: "Implementation<br>& Integration",
    items: ["EDI (X12, onboarding, QA)", "Integrated Payables", "Process Mapping (Visio)", "Partner Onboarding", "Workflow Automation"],
  },
  {
    icon: "robot",
    title: "Automation<br>& RPA",
    items: ["RPA (UiPath)", "Scripting & Workflow", "Documentation & SOPs", "Process Improvement", "System Testing"],
  },
  {
    icon: "chart-line",
    title: "Data &<br>Analytics",
    items: ["SQL & Power BI (DAX, RLS)", "Excel (Power Query), ETL", "Reporting & Dashboarding", "Trend Forecasting", "Data Visualization"],
  },
  {
    icon: "web-grid",
    title: "Web<br>Designer",
    items: ["UI Development", "Web Page Development", "Interactive UX/UI", "Brand Positioning", "Product Mockups"],
  },
  {
    icon: "arrow",
    title: "UI/UX<br>Designer",
    items: ["Usability Testing", "User Research", "Interaction Design", "Responsive Design", "Style Guides"],
  },
];

export const implProjects: ImplProject[] = [
  {
    id: 1, client: "Gordon Food Services", title: "Multi-Party EDI 820 ACH Payment Integration", category: "Payment Solutions", icon: "🏦",
    challenge: "Implemented a new EDI 820 ACH payment solution with embedded addenda transmitted through High Radius—a multi-party integration requiring precise coordination.",
    approach: ["Initiated comprehensive kickoff to verify ISA header preferences, PGP encryption, file turnaround times, and credit/debit protocols", "Established weekly staging project sync meetings", "Guided end-to-end testing including null file testing with PGP encryption"],
    impact: [{ metric: "On-Time Delivery", description: "Delivered on time and to exact specifications" }, { metric: "Zero Post-Production Fixes", description: "Weekly syncs caught all issues early" }, { metric: "Streamlined Operations", description: "Smooth workflow between GFS, High Radius, and PNC" }],
    technologies: ["EDI 820", "ACH", "PGP Encryption", "AS2/SFTP", "High Radius"]
  },
  {
    id: 2, client: "BDO USA", title: "Enterprise File Integration & Scope Redefinition", category: "Requirements Analysis", icon: "📋",
    challenge: "BDO USA submitted a request for testing services covering Positive Pay, ACH, Wires, and Acknowledgment files—deeper analysis uncovered hidden complexities.",
    approach: ["Reworked project documentation with comprehensive technical synopsis", "Identified critical upstream dependency with PeopleSoft ERP integration", "Flagged ACH integration requiring separate PPD vs CCD+/CTX configurations"],
    impact: [{ metric: "3-4 Weeks Saved", description: "Caught complexities early preventing delays" }, { metric: "$50K Annual Savings", description: "Became template for similar ERP integrations" }, { metric: "Client Commendation", description: "Praised for thoroughness and proactive approach" }],
    technologies: ["Positive Pay", "ACH (PPD/CCD+/CTX)", "Wire Transfers", "PeopleSoft ERP", "Snap Logic/DPS"]
  },
  {
    id: 3, client: "Diebold Nixdorf Inc", title: "Adaptive Scope Management & EDI Enhancement", category: "Agile Delivery", icon: "🔄",
    challenge: "Initially engaged to update invalid CTX reporting functionality. During discovery, an additional need for inbound EDI 820 testing emerged.",
    approach: ["Actively listened to uncover additional EDI 820 testing requirement", "Evaluated technical overlap rather than treating as scope creep", "Restructured project plan to accommodate both requests simultaneously"],
    impact: [{ metric: "3-4 Weeks Saved", description: "Eliminated need for second project kickoff" }, { metric: "Comprehensive Solution", description: "Improved reporting and payment processing" }, { metric: "Trusted Advisor", description: "Positioned as thinking beyond immediate requests" }],
    technologies: ["EDI 820", "CTX Reporting", "Inbound EDI Processing"]
  },
  {
    id: 4, client: "Metergy Solutions", title: "Mastercard RPPS Implementation & Knowledge Building", category: "Documentation & Training", icon: "📚",
    challenge: "Adding Mastercard RPPS Items in CIE format to two RT55 setups—highly specialized with virtually no documentation.",
    approach: ["Partnered with the one knowledgeable team member to extract tacit knowledge", "Created comprehensive documentation covering configuration, data mappings, testing, and troubleshooting", "Established documentation as reusable asset in knowledge repository"],
    impact: [{ metric: "60% Efficiency Gain", description: "Reduced implementation from 40+ to ~15 hours" }, { metric: "6 Subsequent Uses", description: "Documentation referenced for future implementations" }, { metric: "Risk Mitigation", description: "Eliminated single-point-of-failure knowledge dependency" }],
    technologies: ["Mastercard RPPS", "CIE Format", "RT55", "EDI 820"]
  },
  {
    id: 5, client: "Thoroughbred Funding / Norfolk Southern", title: "Creative Data Pathway Solution", category: "Problem Solving", icon: "🚂",
    challenge: "Freight bill numbers missing in High Radius. Standard solution would modify a map used by thousands of customers—6+ month timeline.",
    approach: ["Assessed standard solution timeline of 6+ months", "Analyzed alternative data pathways leveraging existing freeform field", "Presented creative alternative using OBI field to pass freight bill data"],
    impact: [{ metric: "2 Weeks vs 6+ Months", description: "Resolved in fraction of standard timeline" }, { metric: "$75K Saved", description: "Avoided enterprise-wide development costs" }, { metric: "Zero Disruption", description: "No risk to thousands of other clients" }],
    technologies: ["EDI Mapping", "PME", "High Radius", "OBI Field Configuration"]
  },
  {
    id: 6, client: "Trinity Health", title: "Enterprise-Wide Formatting Solution", category: "Technical Resolution", icon: "🏥",
    challenge: "Check numbers not populating correctly in Integrated Receivables. Wellmark ACH items had tilde formatting issues in addenda records.",
    approach: ["Convened cross-functional meeting to diagnose data feed issues", "Positioned as production support to protect client from unnecessary costs", "Developed global solution fixing Trinity Health and preventing similar issues across all clients"],
    impact: [{ metric: "$12K Saved", description: "Avoided feature development fees" }, { metric: "40+ Issues Prevented", description: "Global fix across entire client base" }, { metric: "15% Accuracy Gain", description: "Enhanced integrated receivables processing" }],
    technologies: ["Integrated Receivables", "EDI", "Lockbox", "ACH Addenda Processing"]
  },
  {
    id: 7, client: "Regal Beloit / Rexnord", title: "Rare EBPP Implementation & Enterprise Enhancement", category: "Specialized Implementation", icon: "⚙️",
    challenge: "Consolidating direct transmission files and adding Payer Express via EBPP—highly specialized work completed only 8 times previously at PNC Bank.",
    approach: ["Created EBPP AR9 with custom mapping and new value translation table", "Resolved critical mismatch between effective and posted dates", "Coordinated patches for AMEX duplication and contactless payment type issues"],
    impact: [{ metric: "8-10 Hrs/Month Saved", description: "Streamlined reconciliation process" }, { metric: "100+ Hours Saved", description: "Global updates prevented future troubleshooting" }, { metric: "Reference Template", description: "Became template for subsequent EBPP deployments" }],
    technologies: ["EBPP", "EDI 820", "Esker", "Payer Express", "RT 55"]
  }
];

export const navItems: NavItem[] = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "services", label: "services" },
  { id: "thoughts", label: "thoughts", isLink: true, href: "/thoughts" },
  { id: "builds", label: "builds", isLink: true, href: "/builds" },
  { id: "contact", label: "contact" },
];

export const skillCategories = [
  { id: "data" as SkillCategory, icon: "database", title: "Data Engineer", years: "8+ years" },
  { id: "edi" as SkillCategory, icon: "exchange", title: "EDI Implementer", years: "2+ years" },
  { id: "relations" as SkillCategory, icon: "users-alt", title: "Client Relations", years: "10+ years" },
  { id: "frontend" as SkillCategory, icon: "brackets-curly", title: "Frontend Developer", years: "2 years" },
  { id: "backend" as SkillCategory, icon: "server-network", title: "Backend & iOS Developer", years: "2 years" },
  { id: "design" as SkillCategory, icon: "swatchbook", title: "UI/UX Designer", years: "2 years" },
];

export const implCategories = ["all", ...Array.from(new Set(implProjects.map(p => p.category)))];

export const steadfastImages = ["/img/st1.PNG", "/img/st2.PNG", "/img/st3.PNG", "/img/st4.PNG", "/img/st5.PNG"];
