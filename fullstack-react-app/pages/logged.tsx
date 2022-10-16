import { Button, Center, Container, Flex, Text } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, signOut } from 'next-auth/react';

type loggedInPageProps = {
	session: {
		user: {
			name: string | null;
			email: string | null;
			image: string | null;
		};
	} | null;
};

const logged: NextPage<loggedInPageProps> = ({ session }) => {
	return (
		<Container py={`64px`}>
			<Center>
				<Flex flexDirection={`column`}>
					<Text mb={`24px`}>Welcome back {session?.user.name}! 😍</Text>
					<Button onClick={() => signOut()}>Log out</Button>
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

export default logged;
