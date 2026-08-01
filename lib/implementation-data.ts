export type ImplementationProject = {
  id: number;
  client: string;
  title: string;
  category: string;
  icon: string;
  challenge: string;
  approach: string[];
  impact: { metric: string; description: string }[];
  technologies: string[];
};

export const implementationProjects: ImplementationProject[] = [
  {
    id: 1,
    client: "Global Manufacturing",
    title: "Production PostgreSQL to Azure Modernization",
    category: "Cloud Modernization",
    icon: "AZ",
    challenge: "A business-critical production database and its application estate needed to move to managed Azure infrastructure without disrupting shop-floor operations.",
    approach: ["Directed readiness, dependency and rollback planning across database and application owners", "Established TLS, access, reconciliation and cutover controls", "Converted the migration record into operating documentation and a reusable recovery path"],
    impact: [{ metric: "19.7M Rows", description: "Production data reconciled after cutover" }, { metric: "12-Min Restore", description: "Restore time reduced from a legacy two-hour process" }, { metric: "No Rollback", description: "Cutover completed inside the planned window" }],
    technologies: ["Azure Database for PostgreSQL", "PostGIS", "Docker", "TLS", "Cutover Governance"],
  },
  {
    id: 2,
    client: "Enterprise Information Management",
    title: "API-Direct Market Data Pipeline",
    category: "Pipeline Engineering",
    icon: "API",
    challenge: "A fragile file-based market-data flow created recurring refresh failures and hidden operational dependencies.",
    approach: ["Set an API-direct target architecture and explicit schema contract", "Coordinated the Dataflow Gen2 rebuild and downstream report repoint", "Added refresh verification and recovery guidance so ownership could transfer cleanly"],
    impact: [{ metric: "10K+ Rows", description: "Daily refresh volume validated" }, { metric: "Zero Data Loss", description: "Repoint and refresh reconciliation completed" }, { metric: "Move-Resilient", description: "Source relocation no longer silently breaks refresh" }],
    technologies: ["Microsoft Fabric", "Dataflow Gen2", "REST API", "Power Query M", "Power BI"],
  },
  {
    id: 3,
    client: "Commercial Leadership",
    title: "Executive Market Intelligence Model",
    category: "Analytics Products",
    icon: "BI",
    challenge: "Leadership needed one governed view of revenue, backlog, market plans and forward outlook instead of competing definitions across reports.",
    approach: ["Led the semantic-model redesign around certified sources and explicit business rules", "Aligned finance, commercial and operations stakeholders on metric treatment", "Built clear explainers, model documentation and a controlled operating cadence"],
    impact: [{ metric: "12-Table Model", description: "Lean governed semantic layer" }, { metric: "One Source", description: "Competing definitions aligned" }, { metric: "Executive Ready", description: "Forward-looking decision views delivered" }],
    technologies: ["Power BI", "TMDL", "DAX", "Azure Synapse", "Data Governance"],
  },
  {
    id: 4,
    client: "Enterprise Information Management",
    title: "EIM Knowledge Platform",
    category: "Data Governance",
    icon: "KB",
    challenge: "A large analytics estate lacked a searchable ownership and knowledge layer, making support and transition dependent on individual memory.",
    approach: ["Established a taxonomy across workspaces, models, dataflows and reports", "Directed the migration of technical knowledge into a searchable enterprise surface", "Added ranked search, browse paths and reusable article standards"],
    impact: [{ metric: "1,500+ Articles", description: "Technical knowledge made searchable" }, { metric: "Tenant-Wide", description: "One operating surface for the analytics estate" }, { metric: "Lower Key-Person Risk", description: "Support knowledge moved out of individual memory" }],
    technologies: ["ServiceNow", "Power BI", "Metadata", "Search", "Knowledge Governance"],
  },
  {
    id: 5,
    client: "Enterprise Analytics",
    title: "Data Product Transition and Ownership",
    category: "Portfolio Leadership",
    icon: "PM",
    challenge: "A broad portfolio of semantic models, dataflows and operational services needed clear ownership ahead of a major partner transition.",
    approach: ["Built the asset inventory and dependency view", "Separated hard-date work from deferrable enhancements", "Established takeover, credential, knowledge-transfer and support gates"],
    impact: [{ metric: "67 Assets", description: "Remaining ownership work made visible" }, { metric: "45 Views", description: "Governed warehouse access verified" }, { metric: "Clear Gates", description: "Delivery risks translated into an executable roadmap" }],
    technologies: ["Power BI", "Azure Synapse", "Portfolio Governance", "Lineage", "Service Transition"],
  },
  {
    id: 6,
    client: "Operations and Purchasing",
    title: "Certified Composite Analytics Model",
    category: "Analytics Products",
    icon: "MDL",
    challenge: "Operational teams needed actionable late-purchase-order insight without creating another disconnected copy of enterprise data.",
    approach: ["Reused a certified semantic foundation", "Added business-unit measures and exception logic as a composite model", "Validated the result against live enterprise totals before release"],
    impact: [{ metric: "147K Open POs", description: "Enterprise scope validated" }, { metric: "94K Late", description: "Exception population made actionable" }, { metric: "No Data Copy", description: "Certified lineage preserved" }],
    technologies: ["Power BI", "Composite Models", "DirectQuery", "DAX", "Certified Data Products"],
  },
];
