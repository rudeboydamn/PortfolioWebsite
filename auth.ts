import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { db } from './lib/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
  },
  events: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        const existingUser = await db.getUserByEmail(user.email);
        
        if (!existingUser) {
          await db.createUser(
            user.name || 'Google User',
            user.email,
            null,
            user.image || undefined
          );
        }
      }
    },
  },
});
