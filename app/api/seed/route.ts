import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

const blogPosts = [
  {
    date: '2026-01-09',
    title: 'From Tedious Tasks to Strategic Genius: How AI is Supercharging EDI for SMBs',
    content: `AI is emerging as the ultimate force multiplier for SMBs, transforming EDI from a cost-center necessity into a strategic engine for growth.

In the world of small and medium-sized businesses (SMBs), Electronic Data Interchange (EDI) is a double-edged sword. It's the essential backbone for trading with larger partners and retailers, automating the exchange of purchase orders, invoices, and shipping notices. But let's be honest—it can also be a complex, time-draining beast.

Enter Artificial Intelligence and Machine Learning. This isn't just a tech buzzword for the giants anymore. AI-Powered Auto-Mapping changes the game by learning from thousands of existing EDI maps and document structures. When a new partner's specifications arrive, ML algorithms can predict and propose the correct mapping with high accuracy, cutting setup time from weeks to hours.

For SMBs, AI in EDI isn't about futuristic robots; it's about practical empowerment. It's about working smarter, not harder—automating the tedious, illuminating the hidden opportunities in your data, and allowing you to be more agile, strategic, and competitive.`,
  },
  {
    date: '2025-11-30',
    title: 'Why Visibility Is the New Currency in Supply Chain Tech',
    content: `Data wins.

Businesses no longer tolerate "black box" integrations. They want real-time status, predictive alerts, and analytics on file volumes, SLA compliance, and failure trends. Modern integration engines and iPaaS dashboards give unparalleled insights into how documents move across systems. Visibility turns integrations from "IT plumbing" into a strategic asset that drives continuous improvement.`,
  },
  {
    date: '2025-11-23',
    title: 'The New Era of Partner Onboarding',
    content: `Onboarding used to take weeks—now it can take hours.

Automation templates, reusable maps, dynamic validation, and API-based testing environments drastically reduce onboarding times. Instead of rebuilding integrations, teams now duplicate frameworks and apply partner-specific rules. This shift speeds up revenue realization and reduces IT workload. The companies that win fastest are the ones who onboard partners fastest.`,
  },
  {
    date: '2025-11-16',
    title: 'How Integrations Improve Customer Experience Without Anyone Noticing',
    content: `When integrations work, customers feel the difference.

Accurate inventory? Smooth order flows? On-time delivery alerts? All integration-driven. When an ERP, WMS, and logistics partner sync seamlessly, customers enjoy frictionless experiences without ever seeing the backend. Fast reconciliations, fewer disputes, and cleaner data all translate directly into customer trust and loyalty. Good integrations quietly boost brand reputation.`,
  },
  {
    date: '2025-11-09',
    title: 'Fun Fact: The 850 PO Is Older Than Most Tech We Use Today',
    content: `Yet it still works perfectly.

The 850 purchase order format has remained largely unchanged for decades because it's efficient and universal. Even as XML and JSON gained popularity, the 850's structured data continues powering retail, distribution, and manufacturing. Its longevity proves that well-designed standards can survive multiple generations of technology innovations.`,
  },
  {
    date: '2025-11-02',
    title: 'The Rise of iPaaS: Why Businesses Are Finally Letting Go of Legacy Middleware',
    content: `Cloud integration isn't the future—it's the present.

iPaaS platforms deliver speed, scalability, and out-of-the-box connectors. Whether it's SFTP workflows, EDI mapping, or API orchestration, modern platforms reduce development time dramatically. They also bring built-in monitoring and analytics, making it easier for teams to see bottlenecks and resolve issues. Companies adopting iPaaS aren't just modernizing—they're unlocking agility.`,
  },
  {
    date: '2025-10-26',
    title: 'Error Handling: The Most Underrated Skill in Integration',
    content: `Great integrations fail—great integrators fix them fast.

Companies lose thousands when an 856 fails or a 997 never arrives. An expert knows how to monitor flows, detect failures early, and recover without business interruption. Real-time dashboards, alerting, and retry logic turn painful outages into manageable events. Integration success isn't just about building maps—it's about protecting the entire order-to-cash engine.`,
  },
  {
    date: '2025-10-19',
    title: 'How Automation Is Transforming Warehouse Integrations',
    content: `WMS integrations used to be slow and manual—now they're fast and dynamic.

From 940/945 workflows to real-time pick confirmations, modern warehouses thrive on automation. Integration engines ingest XML, JSON, and flat files, then translate them into actionable instructions. With automated exception alerts, self-healing workflows, and smart routing, fulfillment centers now run with fewer errors and much faster cycle times. Integration is becoming a competitive advantage.`,
  },
  {
    date: '2025-10-12',
    title: 'APIs vs. EDI: The Real Story Behind the Hype',
    content: `It's not a battle—it's a partnership.

Real-time APIs bring speed and flexibility; EDI brings structure and predictability. The smartest companies blend both: APIs for instant inventory checks and tracking, EDI for high-volume order flows like 940s and 945s. Middleware platforms now bridge the two effortlessly, enabling hybrid integrations that reduce costs and boost visibility without forcing teams to choose one over the other.`,
  },
  {
    date: '2025-10-05',
    title: 'AS2 Is Back: Why Secure B2B Transport Still Matters',
    content: `AS2 isn't flashy—but it's everywhere.

With rising cybersecurity requirements, AS2 continues to dominate secure file exchange. Its non-repudiation and encryption make it ideal for modern compliance expectations. Paired with cloud-based AS2 hubs and automated certificate rotation, the protocol is experiencing a quiet resurgence. In a world full of APIs, AS2 remains the gold standard for mission-critical supply chain documents.`,
  },
  {
    date: '2025-09-28',
    title: 'The Hidden Power of EDI: Why It Still Runs Global Supply Chains',
    content: `Despite being decades old, EDI remains the backbone of commerce.

From 850 purchase orders to 856 ASNs, EDI quietly moves trillions in goods every year. What makes it timeless is stability, standardization, and near-zero ambiguity. Modern tools like iPaaS and API-driven visibility layers now elevate EDI from "batch processing" to "smart automation." As long as businesses rely on structured B2B communication, EDI will keep leading the way—just with better speed, monitoring, and intelligence layered on top.`,
  },
  {
    date: '2025-10-26',
    title: 'Strengthening Supply-Chain Resilience Through EDI Integration',
    content: `As global disruptions continue to challenge supply chains, companies are turning to EDI to enhance visibility, agility, and communication with partners.

Ongoing port delays, raw material shortages, and geopolitical tensions have exposed just how fragile global supply chains remain. Recent insights from Gartner emphasize that advanced visibility and scenario planning are now essential for resilience.

EDI plays a critical role here, enabling structured, automated, and consistent information flow across partners. When communication is seamless, decisions become proactive, not reactive.

Resilience isn't built during calm—it's proven during disruption. By leveraging EDI as a communication and visibility backbone, organizations can respond faster, collaborate better, and make smarter decisions when challenges arise.`,
  },
  {
    date: '2025-10-20',
    title: 'The Future is Here: How AI is Revolutionizing EDI Integration',
    content: `Discover how Artificial Intelligence (AI) is transforming Electronic Data Interchange (EDI) systems, boosting efficiency, accuracy, and business intelligence.

In today's fast-paced digital economy, inefficiency is no longer an option. For decades, Electronic Data Interchange (EDI) has powered seamless B2B communication—automating invoices, purchase orders, and shipping details.

Classic EDI automates. AI-enhanced EDI optimizes. Instead of merely transferring data, AI-enabled EDI systems can now analyze, predict, and act. Picture an EDI platform that anticipates supplier delays, detects missing data, or learns optimal delivery schedules—all autonomously.

AI isn't replacing EDI—it's redefining it. The companies merging automation with intelligence will be the ones leading in accuracy, agility, and growth. The future of business communication is smart, connected, and AI-driven.`,
  },
];

export async function POST(request: Request) {
  try {
    const { secret } = await request.json();

    if (secret !== process.env.NEXTAUTH_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Initialize schema first
    await db.initializeSchema();

    const adminEmail = 'dammy@dammyhenry.com';
    const adminName = 'Dammy Henry';
    const adminPassword = 'valleyvale';

    // Check if admin exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${adminEmail} LIMIT 1
    `;

    let userId: number;

    if (existingUser.rows.length > 0) {
      userId = existingUser.rows[0].id;
      // Update password to ensure it's correct
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await sql`
        UPDATE users SET password = ${hashedPassword}, role = 'admin' WHERE id = ${userId}
      `;
      console.log(`Updated admin user with ID: ${userId}`);
    } else {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const newUser = await sql`
        INSERT INTO users (name, email, password, role)
        VALUES (${adminName}, ${adminEmail}, ${hashedPassword}, 'admin')
        RETURNING id
      `;
      userId = newUser.rows[0].id;
      console.log(`Created admin user with ID: ${userId}`);
    }

    // Migrate blog posts
    let migrated = 0;
    let skipped = 0;

    for (const post of blogPosts) {
      const existing = await sql`
        SELECT id FROM thoughts WHERE title = ${post.title} LIMIT 1
      `;

      if (existing.rows.length === 0) {
        await sql`
          INSERT INTO thoughts (user_id, title, content, created_at)
          VALUES (${userId}, ${post.title}, ${post.content}, ${new Date(post.date).toISOString()})
        `;
        migrated++;
      } else {
        skipped++;
      }
    }

    return NextResponse.json({
      message: 'Seed completed successfully',
      admin: { email: adminEmail, password: adminPassword },
      thoughts: { migrated, skipped, total: blogPosts.length },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Seed failed', details: String(error) },
      { status: 500 }
    );
  }
}
