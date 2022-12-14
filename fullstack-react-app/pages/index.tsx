import { Flex } from '@chakra-ui/react';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { Hero } from '../components/molecules/Hero/Hero';
import { LandingBody } from '../components/organisms/LandingBody/LandingBody';
import { LandingFooter } from '../components/organisms/LandingFooter/LandingFooter';
import { TopBar } from '../components/organisms/TopBar/TopBar';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>SuperApp</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<TopBar />

			<Flex>
				<Hero />
			</Flex>

			<LandingBody />
			<LandingFooter />
		</div>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (session) {
		return {
			redirect: {
				destination: '/logged',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
