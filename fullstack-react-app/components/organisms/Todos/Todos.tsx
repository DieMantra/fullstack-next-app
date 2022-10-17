import { Todo } from '.prisma/client';
import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

type TodosProps = {
	todos: Todo[];
};

const Todos: React.FC<TodosProps> = ({ todos }) => {
	return (
		<>
			<Heading fontSize={`2xl`} mb={`16px`} mt={`24px`}>
				Todos
			</Heading>
			{todos?.map((todo) => {
				return <Flex key={todo.id}>{todo.title}</Flex>;
			})}
		</>
	);
};

export default Todos;
