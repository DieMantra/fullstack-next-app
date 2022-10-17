import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { UserSession } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// RETURN IF UNAUTHORIZE

	if (!['PUT', 'DELETE'].includes(req.method || '')) {
		res.status(405).send('Method Not Allowed');
		return;
	}

	const session: Session | null = await getSession({ req });
	if (!session) {
		res.status(401).send('Unauthorized');
	}

	////////////////////////////////

	// MAKING REQUESTS //
	if (req.method === 'PUT') {
		const { pid } = req.query;
		const { title } = req.body;
		const id = pid?.toString();
		if (!id) {
			return res.status(401).send('Some Shit Went Wrong (No ID?)');
		}

		const userSession: UserSession = session as UserSession;
		const todo = await prisma.todo.update({
			where: {
				id,
			},
			data: {
				title,
			},
		});

		return res.json(todo);
	}
	if (req.method === 'DELETE') {
		// DELETE /API/TODO:id -> DELETE TODO
		return res.json('');
	}
};
export default handler;
