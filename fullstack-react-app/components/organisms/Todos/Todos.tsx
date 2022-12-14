import { DeleteIcon } from '@chakra-ui/icons';
import { Checkbox, Flex, Heading, IconButton, Input } from '@chakra-ui/react';
import React from 'react';

type Todo = {
	id: string;
	userId: string;
	title: string;
	isCompleted: boolean;
	createdAt: Date;
	updatedAt: Date;
};

type TodosProps = {
	todos: Todo[];
	loader: JSX.Element | string;
	onTodoBlur: (todoId: string, newTitle: string) => void;
	onTodoCompleteToggle: (todoId: string, isCompleted: Boolean) => void;
	onTodoDelete: (id: string) => void;
};

const Todos: React.FC<TodosProps> = ({
	todos,
	loader,
	onTodoBlur,
	onTodoCompleteToggle,
	onTodoDelete,
}) => {
	return (
		<div
			style={{
				borderRadius: '5px',
				border: '1px solid transparent',
				boxShadow: '0 2px 5px 1px rgb(64 60 67 / 16%)',
				padding: '12px',
			}}
		>
			<Heading
				color={`white`}
				fontSize={`2xl`}
				mb={`16px`}
				backgroundColor={`blue.500`}
				borderRadius={`24px`}
				textAlign={`center`}
				py={`2`}
				textShadow={`1px 1px 3px rgb(64 60 67 / 16%)`}
			>
				Todos
			</Heading>
			{todos?.map((todo, i) => {
				return (
					<Flex
						key={todo.id}
						gap={`12px`}
						my={`4px`}
						align={`center`}
						role={`group`}
					>
						<Input
							defaultValue={todo.title}
							variant={`flushed`}
							readOnly={todo.isCompleted ? true : false}
							textDecoration={todo.isCompleted ? 'line-through' : ''}
							color={todo.isCompleted ? 'gray.500' : 'gray.800'}
							onBlur={(e) => {
								if (todo.title === e.target.value) return;
								onTodoBlur(todo.id, e.target.value);
							}}
							overflowX={`scroll`}
						/>

						<IconButton
							aria-label={'Delete Todo'}
							icon={<DeleteIcon />}
							variant={`ghost`}
							colorScheme={`red`}
							size={`sm`}
							onClick={() => onTodoDelete(todo.id)}
							opacity={`0`}
							display={`none`}
							_groupHover={{ opacity: '1', display: 'flex' }}
						/>
						<Checkbox
							isChecked={todo.isCompleted}
							onChange={(e) => onTodoCompleteToggle(todo.id, e.target.checked)}
						/>
					</Flex>
				);
			})}
			{loader}
		</div>
	);
};

export default Todos;
