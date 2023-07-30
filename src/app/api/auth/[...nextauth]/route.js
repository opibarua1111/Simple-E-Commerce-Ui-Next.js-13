import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'John Smith',
        },
      },
      async authorize(credentials) {
        const data = {
           id: credentials.id,
           username: credentials.username,
           email: credentials.email,
           accessToken: credentials.token
        }
        if (data) {
          return data;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV === 'development',
  debug: false,
  session: {
      strategy: 'jwt',
  },
  jwt: {
      secret: process.env.JWT_SECRET
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

