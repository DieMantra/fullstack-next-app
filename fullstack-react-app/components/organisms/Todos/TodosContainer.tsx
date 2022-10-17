import React, { useEffect, useState } from 'react';
import Todos from './Todos';

const fetchTodos = async () => {
	const response = await fetch('/api/todos');
	const data = response.json();
	return data;
};

const TodosContainer = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetchTodos().then((todos) => setTodos(todos));
	}, []);

	if (todos.length === 0) {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: '36px',
				}}
			>
				<img src='/loaders/puff.svg' style={{ width: '7rem' }} />
			</div>
		);
	}

	return <Todos todos={todos} />;
};

export default TodosContainer;
