import { Text } from '@chakra-ui/react';
import Link from 'next/link';

type MenuItemProps = {
	text: string;
	href: string;
};

export const MenuItem: React.FC<MenuItemProps> = ({ text, href }) => {
	return (
		<Text
			_hover={{ backgroundColor: 'gray.100', transition: '200ms all' }}
			color={`gray.600`}
			fontSize={`18px`}
			p={`8px 16px`}
			borderRadius={`5px`}
		>
			<Link href={`/${href}`}>
				<a>{text}</a>
			</Link>
		</Text>
	);
};
