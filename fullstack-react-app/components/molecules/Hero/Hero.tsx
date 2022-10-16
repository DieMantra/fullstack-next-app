import { Container, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export const Hero = () => {
	return (
		<Flex
			w={`100%`}
			background={`
    linear-gradient(106deg, rgba(255,159,67,1) 0%, rgba(203,155,255,1) 50%, rgba(84,168,232,1) 100%)
    `}
		>
			<Container py={`64px`}>
				<Heading>
					Increase you productivity
					<br />
					Make your app in minutes
				</Heading>
				<Text mt={`8px`} fontSize={`26px`} color={`gray.600`}>
					Your fullstack React app
				</Text>
			</Container>
		</Flex>
	);
};
