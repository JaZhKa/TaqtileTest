import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>5S Control</div>
			<nav>
				<ul className={styles.navList}>
					<li>
						<Link to="/">Главная</Link>
					</li>
					<li>
						<Link to="/tasks">Задачи 5S</Link>
					</li>
					<li>
						<Link to="/contact">Контакты</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
