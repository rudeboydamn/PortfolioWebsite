import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

const blogPosts = [
  {
    date: 'January 9, 2026',
    title: 'From Tedious Tasks to Strategic Genius: How AI is Supercharging EDI for SMBs',
    intro: 'AI is emerging as the ultimate force multiplier for SMBs, transforming EDI from a cost-center necessity into a strategic engine for growth.',
  },
  {
    date: 'November 30, 2025',
    title: 'Why Visibility Is the New Currency in Supply Chain Tech',
    intro: 'Data wins.',
  },
  {
    date: 'November 23, 2025',
    title: 'The New Era of Partner Onboarding',
    intro: 'Onboarding used to take weeks—now it can take hours.',
  },
  {
    date: 'November 16, 2025',
    title: 'How Integrations Improve Customer Experience Without Anyone Noticing',
    intro: 'When integrations work, customers feel the difference.',
  },
  {
    date: 'November 9, 2025',
    title: 'Fun Fact: The 850 PO Is Older Than Most Tech We Use Today',
    intro: 'Yet it still works perfectly.',
  },
  {
    date: 'November 2, 2025',
    title: 'The Rise of iPaaS: Why Businesses Are Finally Letting Go of Legacy Middleware',
    intro: "Cloud integration isn't the future—it's the present.",
  },
  {
    date: 'October 26, 2025',
    title: 'Error Handling: The Most Underrated Skill in Integration',
    intro: 'Great integrations fail—great integrators fix them fast.',
  },
  {
    date: 'October 19, 2025',
    title: 'How Automation Is Transforming Warehouse Integrations',
    intro: "WMS integrations used to be slow and manual—now they're fast and dynamic.",
  },
  {
    date: 'October 12, 2025',
    title: 'APIs vs. EDI: The Real Story Behind the Hype',
    intro: "It's not a battle—it's a partnership.",
  },
  {
    date: 'October 5, 2025',
    title: 'AS2 Is Back: Why Secure B2B Transport Still Matters',
    intro: "AS2 isn't flashy—but it's everywhere.",
  },
  {
    date: 'September 28, 2025',
    title: 'The Hidden Power of EDI: Why It Still Runs Global Supply Chains',
    intro: 'Despite being decades old, EDI remains the backbone of commerce.',
  },
  {
    date: 'October 26, 2025',
    title: 'Strengthening Supply-Chain Resilience Through EDI Integration',
    intro: 'As global disruptions continue to challenge supply chains, companies are turning to EDI to enhance visibility, agility, and communication with partners.',
  },
  {
    date: 'October 20, 2025',
    title: 'The Future is Here: How AI is Revolutionizing EDI Integration',
    intro: 'Discover how Artificial Intelligence (AI) is transforming Electronic Data Interchange (EDI) systems, boosting efficiency, accuracy, and business intelligence.',
  },
];

async function migrate() {
  try {
    console.log('Starting migration of blog posts to thoughts...');

    const adminEmail = 'dammy@dammyhenry.com';
    const adminName = 'Dammy Henry';
    const adminPassword = 'valleyvale';

    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${adminEmail} LIMIT 1
    `;

    let userId: number;

    if (existingUser.rows.length > 0) {
      userId = existingUser.rows[0].id;
      console.log(`Admin user already exists with ID: ${userId}`);
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

    for (const post of blogPosts) {
      const content = post.intro;
      
      const existing = await sql`
        SELECT id FROM thoughts WHERE title = ${post.title} LIMIT 1
      `;

      if (existing.rows.length === 0) {
        await sql`
          INSERT INTO thoughts (user_id, title, content, created_at)
          VALUES (${userId}, ${post.title}, ${content}, ${new Date(post.date).toISOString()})
        `;
        console.log(`✓ Migrated: ${post.title}`);
      } else {
        console.log(`⊘ Skipped (already exists): ${post.title}`);
      }
    }

    console.log('\n✅ Migration completed successfully!');
    console.log(`Admin credentials: ${adminEmail} / ${adminPassword}`);
    console.log('⚠️  Remember to change your password after first login!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

migrate();
