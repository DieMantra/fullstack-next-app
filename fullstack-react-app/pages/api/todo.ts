import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { UserSession } from './auth/[...nextauth]';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		// Return all the todos for current user
		res.status(405).send('Method Not Allowed');
		return;
	}

	const session: Session | null = await getSession({ req });
	if (!session) {
		res.status(401).send('Unauthorized');
	}

	if (req.method === 'POST') {
		// POST /API/TODO -> CREATE TODO
		const { title } = req.body;
		if (!title) return res.status(400).send('Bad Request | (NO TEXT)');

		const userSession: UserSession = session as UserSession;
		const createdTodo = await prisma.todo.create({
			data: {
				title,
				userId: userSession.userId,
				isCompleted: false,
			},
		});

		return res.json(createdTodo);
	}
};
export default handler;
