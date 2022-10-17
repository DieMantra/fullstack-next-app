import { AddIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

type TodoCreatorProps = {
	onTodoCreated: () => void;
};

const TodoCreator: React.FC<TodoCreatorProps> = ({ onTodoCreated }) => {
	const [title, setTitle] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onCreate = () => {
		setIsLoading(true);
		axios
			.post('/api/todo', {
				title: title,
			})
			.then(() => {
				onTodoCreated();
				setTitle('');
			})
			.catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('Error', error.message);
				}
				console.log(error.config);
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<Flex flexDirection={`column`} py={`16px`}>
			<Heading size={`md`} mb={`8px`} textAlign={`center`}>
				Create a Todo
			</Heading>
			<Flex gap={`4px`}>
				<Input
					onKeyUp={(e) => {
						if (e.key === 'Enter') {
							onCreate();
						}
					}}
					placeholder='Something to do...'
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<IconButton
					variant={`solid`}
					colorScheme={`blue`}
					onClick={onCreate}
					aria-label='Search database'
					icon={<AddIcon />}
					isLoading={isLoading}
				/>
			</Flex>
		</Flex>
	);
};

export default TodoCreator;
