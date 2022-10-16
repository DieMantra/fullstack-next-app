import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { MenuItem } from '../../molecules/MenuItem/MenuItem';

// export default function Component() {
//   const { data: session } = useSession()
//   if (session) {
//     return (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     )
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn()}>Sign in</button>
//     </>
//   )
// }

export const TopBar = () => {
	const breakPoints = ['xs', 'sm', 'md', 'lg'];

	return (
		<Flex
			w={`100%`}
			flexDirection={`row`}
			alignContent={`center`}
			p={`16px 16px`}
			justifyContent={`center`}
		>
			<Flex
				w={['100%', '100%', '100%', '130ch']}
				flexDirection={`row`}
				alignContent={`center`}
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
				<HStack spacing={`8px`}>
					<MenuItem text={`Blog`} href={`blog`} />
					<MenuItem text={`Product`} href={`product`} />
					<MenuItem text={`Pricing`} href={`pricing`} />
				</HStack>
				<Flex marginLeft={`82px`}>
					<Button
						variant={`solid`}
						colorScheme={`blue`}
						onClick={() => signIn()}
					>
						Get Started
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};
