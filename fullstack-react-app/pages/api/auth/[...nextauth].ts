import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import { signIn } from 'next-auth/react';
import prisma from '../../../lib/prismadb';

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		TwitterProvider({
			clientId: process.env.TWITTER_API_KEY || '',
			clientSecret: process.env.TWITTER_API_KEY_SECRET || '',
			version: '2.0',
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
});
