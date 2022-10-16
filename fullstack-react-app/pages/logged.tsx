import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

const logged: NextPage = ({ session, hello }) => {
	console.log('Session >>>>>', session);

	return <div>logged In {hello}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getSession({ req });
	console.log('First Session >>>>>', session);

	return {
		props: {
			session,
			hello: 'Hello',
		},
	};
};

export default logged;
