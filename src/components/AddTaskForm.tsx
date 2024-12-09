import React, { useState } from 'react';
import styles from '../styles/AddTaskForm.module.css';

type Task = {
	id: number;
	name: string;
	status: 'Новая' | 'В работе' | 'Завершена';
	createdAt: string;
};

type AddTaskFormProps = {
	onAddTask: (task: Task) => void;
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
	const [name, setName] = useState('');
	const [status, setStatus] = useState<'Новая' | 'В работе' | 'Завершена'>(
		'Новая'
	);
	const [createdAt, setCreatedAt] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newTask = {
			id: Date.now(), // Уникальный идентификатор
			name,
			status,
			createdAt,
		};
		onAddTask(newTask);
		setName('');
		setStatus('Новая');
		setCreatedAt('');
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={styles.form}
		>
			<div>
				<label htmlFor="name">Название задачи:</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="status">Статус:</label>
				<select
					id="status"
					value={status}
					onChange={(e) =>
						setStatus(e.target.value as 'Новая' | 'В работе' | 'Завершена')
					}
					required
				>
					<option value="Новая">Новая</option>
					<option value="В работе">В работе</option>
					<option value="Завершена">Завершена</option>
				</select>
			</div>
			<div>
				<label htmlFor="createdAt">Дата:</label>
				<input
					type="date"
					id="createdAt"
					value={createdAt}
					onChange={(e) => setCreatedAt(e.target.value)}
					required
				/>
			</div>
			<button type="submit">Добавить задачу</button>
		</form>
	);
};

export default AddTaskForm;
