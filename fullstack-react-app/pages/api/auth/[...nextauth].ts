import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth, { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import TwitterProvider from 'next-auth/providers/twitter';

const prisma = new PrismaClient();

export type UserSession = {
	userId: string;
} & Session;

type SessionArg = {
	session: Session;
	user: User;
	token: JWT;
};

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		TwitterProvider({
			clientId: process.env.TWITTER_API_KEY || '',
			clientSecret: process.env.TWITTER_API_KEY_SECRET || '',
			version: '2.0',
		}),
	],
	callbacks: {
		session: async ({ session, user }: SessionArg) => {
			// @ts-ignore
			// Adding on a new field to session (Couldn't workout how to write the type correctly)
			session.userId = user.id;
			return Promise.resolve(session as UserSession);
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});
