import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import Modal from './Modal';
import styles from '../styles/TasksTable.module.css';
import EditTaskForm from './EditTaskForm';

type Task = {
	id: number;
	name: string;
	status: 'Новая' | 'В работе' | 'Завершена';
	createdAt: string;
};

const TasksTable: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentTask, setCurrentTask] = useState<Task | null>(null);
	const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
	const [filter, setFilter] = useState<
		'Все' | 'Новая' | 'В работе' | 'Завершена'
	>('Все');
	const storedTasks = localStorage.getItem('tasks');

	useEffect(() => {
		if (storedTasks) {
			setTasks(JSON.parse(storedTasks));
		}
	}, []);

	useEffect(() => {
		if (storedTasks) localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks, storedTasks]);

	const handleAddTask = (task: Task) => {
		setTasks([...tasks, task]);
	};

	const handleEdit = (task: Task) => {
		setCurrentTask(task);
		setIsModalOpen(true);
	};

	const handleUpdateTask = (updatedTask: Task) => {
		setTasks(
			tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
		);
		setIsModalOpen(false);
	};

	const handleDelete = (id: number) => {
		setDeleteTaskId(id);
	};

	const confirmDelete = () => {
		if (deleteTaskId !== null) {
			setTasks(tasks.filter((task) => task.id !== deleteTaskId));
			setDeleteTaskId(null);
		}
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilter(e.target.value as 'Все' | 'Новая' | 'В работе' | 'Завершена');
	};

	const filteredTasks = tasks.filter(
		(task) => filter === 'Все' || task.status === filter
	);

	const downloadJSON = () => {
		const dataStr =
			'data:text/json;charset=utf-8,' +
			encodeURIComponent(JSON.stringify(tasks));
		const downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute('href', dataStr);
		downloadAnchorNode.setAttribute('download', 'tasks.json');
		document.body.appendChild(downloadAnchorNode);
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	};

	const uploadJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event: ProgressEvent<FileReader>) => {
				const result = event.target?.result;
				if (typeof result === 'string') {
					const uploadedTasks = JSON.parse(result);
					setTasks(uploadedTasks);
				}
			};
			reader.readAsText(file);
		}
	};

	return (
		<div>
			<AddTaskForm onAddTask={handleAddTask} />
			<div className={styles.actions}>
				<div className={styles.filter}>
					<label htmlFor="filter">Фильтр по статусу:</label>
					<select
						id="filter"
						value={filter}
						onChange={handleFilterChange}
					>
						<option value="Все">Все</option>
						<option value="Новая">Новая</option>
						<option value="В работе">В работе</option>
						<option value="Завершена">Завершена</option>
					</select>
				</div>
				<button onClick={downloadJSON}>Скачать JSON</button>
				<input
					type="file"
					accept=".json"
					onChange={uploadJSON}
				/>
			</div>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>ID задачи</th>
							<th>Название задачи</th>
							<th>Статус</th>
							<th>Дата создания</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						{filteredTasks.map((task) => (
							<tr key={task.id}>
								<td>{task.id}</td>
								<td>{task.name}</td>
								<td>{task.status}</td>
								<td>{task.createdAt}</td>
								<td>
									<button onClick={() => handleEdit(task)}>
										Редактировать
									</button>
									<button onClick={() => handleDelete(task.id)}>Удалить</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{currentTask && (
				<Modal
					show={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				>
					<EditTaskForm
						task={currentTask}
						onUpdateTask={handleUpdateTask}
					/>
				</Modal>
			)}
			{deleteTaskId !== null && (
				<Modal
					show={true}
					onClose={() => setDeleteTaskId(null)}
				>
					<div>
						<p>Вы уверены, что хотите удалить задачу?</p>
						<button onClick={confirmDelete}>Да</button>
						<button onClick={() => setDeleteTaskId(null)}>Нет</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default TasksTable;
