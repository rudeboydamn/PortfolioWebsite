import { sql } from '@vercel/postgres';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface Thought {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user_name?: string;
  user_image?: string;
  like_count?: number;
  comment_count?: number;
  user_has_liked?: boolean;
}

export interface Comment {
  id: number;
  user_id: number;
  thought_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  user_name?: string;
  user_image?: string;
}

export interface Like {
  id: number;
  user_id: number;
  thought_id: number;
  created_at: Date;
}

export const db = {
  async initializeSchema() {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        image VARCHAR(500),
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS thoughts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(500) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        thought_id INTEGER REFERENCES thoughts(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, thought_id)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        thought_id INTEGER REFERENCES thoughts(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`CREATE INDEX IF NOT EXISTS idx_thoughts_user_id ON thoughts(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_thoughts_created_at ON thoughts(created_at DESC);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_likes_thought_id ON likes(thought_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_comments_thought_id ON comments(thought_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);`;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await sql<User>`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `;
    return result.rows[0] || null;
  },

  async createUser(name: string, email: string, password: string | null, image?: string): Promise<User> {
    const result = await sql<User>`
      INSERT INTO users (name, email, password, image, role)
      VALUES (${name}, ${email}, ${password}, ${image || null}, 'user')
      RETURNING *
    `;
    return result.rows[0];
  },

  async getThoughts(userId?: number, limit = 50): Promise<Thought[]> {
    if (userId) {
      const result = await sql<Thought>`
        SELECT 
          t.*,
          u.name as user_name,
          u.image as user_image,
          COUNT(DISTINCT l.id) as like_count,
          COUNT(DISTINCT c.id) as comment_count,
          EXISTS(SELECT 1 FROM likes WHERE user_id = ${userId} AND thought_id = t.id) as user_has_liked
        FROM thoughts t
        LEFT JOIN users u ON t.user_id = u.id
        LEFT JOIN likes l ON t.id = l.thought_id
        LEFT JOIN comments c ON t.id = c.thought_id
        GROUP BY t.id, u.name, u.image
        ORDER BY t.created_at DESC
        LIMIT ${limit}
      `;
      return result.rows;
    } else {
      const result = await sql<Thought>`
        SELECT 
          t.*,
          u.name as user_name,
          u.image as user_image,
          COUNT(DISTINCT l.id) as like_count,
          COUNT(DISTINCT c.id) as comment_count,
          false as user_has_liked
        FROM thoughts t
        LEFT JOIN users u ON t.user_id = u.id
        LEFT JOIN likes l ON t.id = l.thought_id
        LEFT JOIN comments c ON t.id = c.thought_id
        GROUP BY t.id, u.name, u.image
        ORDER BY t.created_at DESC
        LIMIT ${limit}
      `;
      return result.rows;
    }
  },

  async getThoughtById(id: number, userId?: number): Promise<Thought | null> {
    if (userId) {
      const result = await sql<Thought>`
        SELECT 
          t.*,
          u.name as user_name,
          u.image as user_image,
          COUNT(DISTINCT l.id) as like_count,
          COUNT(DISTINCT c.id) as comment_count,
          EXISTS(SELECT 1 FROM likes WHERE user_id = ${userId} AND thought_id = t.id) as user_has_liked
        FROM thoughts t
        LEFT JOIN users u ON t.user_id = u.id
        LEFT JOIN likes l ON t.id = l.thought_id
        LEFT JOIN comments c ON t.id = c.thought_id
        WHERE t.id = ${id}
        GROUP BY t.id, u.name, u.image
        LIMIT 1
      `;
      return result.rows[0] || null;
    } else {
      const result = await sql<Thought>`
        SELECT 
          t.*,
          u.name as user_name,
          u.image as user_image,
          COUNT(DISTINCT l.id) as like_count,
          COUNT(DISTINCT c.id) as comment_count,
          false as user_has_liked
        FROM thoughts t
        LEFT JOIN users u ON t.user_id = u.id
        LEFT JOIN likes l ON t.id = l.thought_id
        LEFT JOIN comments c ON t.id = c.thought_id
        WHERE t.id = ${id}
        GROUP BY t.id, u.name, u.image
        LIMIT 1
      `;
      return result.rows[0] || null;
    }
  },

  async createThought(userId: number, title: string, content: string): Promise<Thought> {
    const result = await sql<Thought>`
      INSERT INTO thoughts (user_id, title, content)
      VALUES (${userId}, ${title}, ${content})
      RETURNING *
    `;
    return result.rows[0];
  },

  async updateThought(id: number, userId: number, title: string, content: string): Promise<Thought | null> {
    const result = await sql<Thought>`
      UPDATE thoughts
      SET title = ${title}, content = ${content}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *
    `;
    return result.rows[0] || null;
  },

  async deleteThought(id: number, userId: number, isAdmin: boolean): Promise<boolean> {
    const result = isAdmin 
      ? await sql`DELETE FROM thoughts WHERE id = ${id} RETURNING id`
      : await sql`DELETE FROM thoughts WHERE id = ${id} AND user_id = ${userId} RETURNING id`;
    return (result.rowCount ?? 0) > 0;
  },

  async toggleLike(userId: number, thoughtId: number): Promise<{ liked: boolean }> {
    const existing = await sql<Like>`
      SELECT id FROM likes WHERE user_id = ${userId} AND thought_id = ${thoughtId} LIMIT 1
    `;
    
    if (existing.rows.length > 0) {
      await sql`DELETE FROM likes WHERE user_id = ${userId} AND thought_id = ${thoughtId}`;
      return { liked: false };
    } else {
      await sql`INSERT INTO likes (user_id, thought_id) VALUES (${userId}, ${thoughtId})`;
      return { liked: true };
    }
  },

  async getComments(thoughtId: number): Promise<Comment[]> {
    const result = await sql<Comment>`
      SELECT 
        c.*,
        u.name as user_name,
        u.image as user_image
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.thought_id = ${thoughtId}
      ORDER BY c.created_at ASC
    `;
    return result.rows;
  },

  async createComment(userId: number, thoughtId: number, content: string): Promise<Comment> {
    const result = await sql<Comment>`
      INSERT INTO comments (user_id, thought_id, content)
      VALUES (${userId}, ${thoughtId}, ${content})
      RETURNING *
    `;
    return result.rows[0];
  },

  async deleteComment(id: number, userId: number, isAdmin: boolean): Promise<boolean> {
    const result = isAdmin
      ? await sql`DELETE FROM comments WHERE id = ${id} RETURNING id`
      : await sql`DELETE FROM comments WHERE id = ${id} AND user_id = ${userId} RETURNING id`;
    return (result.rowCount ?? 0) > 0;
  },
};
