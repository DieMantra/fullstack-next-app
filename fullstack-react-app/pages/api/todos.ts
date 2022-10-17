import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { UserSession } from './auth/[...nextauth]';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'GET') {
		// Return all the todos for current user
		res.status(405).send('Method Not Allowed');
		return;
	}

	const session: Session | null = await getSession({ req });
	if (!session) {
		res.status(401).send('Unauthorized');
	}

	if (req.method === 'GET') {
		// Return all the todos for current user
		const userSession: UserSession = session as UserSession;
		const todos = await prisma.todo.findMany({
			orderBy: [
				{
					createdAt: 'desc',
				},
			],
			where: {
				userId: userSession.userId,
			},
		});
		return res.json(todos);
	}
};
export default handler;
