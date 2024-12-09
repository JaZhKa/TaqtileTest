import React, { useState } from 'react';
import styles from '../styles/ContactForm.module.css';

const ContactForm: React.FC = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = {
			name,
			email,
			message,
		};
		console.log(JSON.stringify(formData, null, 2));
		setName('');
		setEmail('');
		setMessage('');
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={styles.form}
		>
			<div>
				<label htmlFor="name">Имя:</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="email">Электронная почта:</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div>
				<label htmlFor="message">Сообщение:</label>
				<textarea
					id="message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
				/>
			</div>
			<button type="submit">Отправить</button>
		</form>
	);
};

export default ContactForm;
