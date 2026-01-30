import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
    role: string;
  }

  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      image?: string;
      role: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    role: string;
  }
}
