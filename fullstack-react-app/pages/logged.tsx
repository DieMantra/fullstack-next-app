import { Button, Center, Container, Flex, Text } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import TodoCreator from '../components/molecules/NewTodo/TodoCreator';
import TodosContainer from '../components/organisms/Todos/TodosContainer';

type loggedInPageProps = {
	session: {
		user: {
			name: string | null;
			email: string | null;
			image: string | null;
		};
	} | null;
};

const Logged: NextPage<loggedInPageProps> = ({ session }) => {
	const [refreshTodoToken, setRefreshTodoToken] = useState<string>('');

	return (
		<Container py={`64px`}>
			<Center>
				<Flex flexDirection={`column`}>
					<Text mb={`24px`}>Welcome back - {session?.user.name}! 😍</Text>
					<Button onClick={() => signOut()}>Log out</Button>

					<TodoCreator
						onTodoCreated={() => setRefreshTodoToken(Math.random().toString())}
					/>
					<TodosContainer refreshTodoToken={refreshTodoToken} />
				</Flex>
			</Center>
		</Container>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (!session?.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
};

export default Logged;
