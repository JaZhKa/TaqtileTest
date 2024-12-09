import React, { useState } from 'react';
import styles from '../styles/EditTaskForm.module.css';

type Task = {
	id: number;
	name: string;
	status: 'Новая' | 'В работе' | 'Завершена';
	createdAt: string;
};

type EditTaskFormProps = {
	task: Task;
	onUpdateTask: (task: Task) => void;
};

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onUpdateTask }) => {
	const [name, setName] = useState(task.name);
	const [status, setStatus] = useState(task.status);
	const [createdAt, setCreatedAt] = useState(task.createdAt);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onUpdateTask({ ...task, name, status, createdAt });
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
			<button type="submit">Сохранить изменения</button>
		</form>
	);
};

export default EditTaskForm;
