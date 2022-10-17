import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Todos from './Todos';

const fetchTodos = async () => {
	const response = await fetch('/api/todos');
	const data = response.json();
	return data;
};

type TodosContainerProps = {
	refreshTodoToken: String;
};
type OnTodoBlurFunc = (todoId: string, newTitle: string) => void;
type OnTodoCompleteToggleFun = (todoId: string, isCompleted: Boolean) => void;
type OnTodoDeleteFunc = (todoId: string) => void;

const TodosContainer: React.FC<TodosContainerProps> = ({
	refreshTodoToken,
}) => {
	const [todos, setTodos] = useState([]);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState<Boolean>();
	const [completedToken, setCompletedToken] = useState('');

	useEffect(() => {
		setIsLoading(true);
		fetchTodos()
			.then((todoData) => {
				setTodos(todoData);
			})
			.catch((e) => {
				setIsError(true);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodoToken, completedToken]);

	// ON ACTIONS
	const onTodoBlur: OnTodoBlurFunc = (todoId, newTitle) => {
		setIsLoading(true);
		axios.put(`/api/todo/${todoId}`, {
			title: newTitle,
		});
	};
	const onTodoCompleteToggle: OnTodoCompleteToggleFun = (
		todoId,
		isCompleted
	) => {
		setIsLoading(true);
		axios
			.put(`/api/todo/${todoId}`, {
				isCompleted,
			})
			.finally(() => {
				setCompletedToken(Math.random().toString());
			});
	};
	const onTodoDelete: OnTodoDeleteFunc = (todoId) => {
		setIsLoading(true);
		axios.delete(`/api/todo/${todoId}`).finally(() => {
			setCompletedToken(Math.random().toString());
		});
	};
	//

	// LOADING AND ERROS
	if (isError) {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: '36px',
				}}
			>
				<h1>Oops... Something went wrong 😢</h1>
			</div>
		);
	}
	const loader = (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: '36px',
			}}
		>
			<img src='/loaders/puff.svg' style={{ width: '5rem' }} />
		</div>
	);
	//
	return (
		<Todos
			todos={todos}
			loader={isLoading ? loader : ''}
			onTodoBlur={onTodoBlur}
			onTodoCompleteToggle={onTodoCompleteToggle}
			onTodoDelete={onTodoDelete}
		/>
	);
};

export default TodosContainer;
