import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { MenuItem } from '../../molecules/MenuItem/MenuItem';

export const TopBar = () => {
	return (
		<Flex
			w={`100%`}
			flexDirection={`row`}
			alignContent={`center`}
			p={`8px 16px`}
		>
			<Text
				fontSize={`36px`}
				fontWeight={`bold`}
				lineHeight={`42px`}
				color={`#1F79BA`}
				flexGrow={1}
			>
				SuperApp
			</Text>
			<HStack spacing={`16px`}>
				<MenuItem text={`Blog`} href={`blog`} />
				<MenuItem text={`Product`} href={`product`} />
				<MenuItem text={`Pricing`} href={`pricing`} />
			</HStack>
			<Flex marginLeft={`82px`}>
				<Button variant={`solid`} colorScheme={`blue`}>
					Get Started
				</Button>
			</Flex>
		</Flex>
	);
};
