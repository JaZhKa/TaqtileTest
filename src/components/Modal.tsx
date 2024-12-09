import React from 'react';
import styles from '../styles/Modal.module.css';

type ModalProps = {
	show: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
	if (!show) {
		return null;
	}

	return (
		<div className={styles.modal}>
			<div className={styles.modalContent}>
				<span
					className={styles.close}
					onClick={onClose}
				>
					&times;
				</span>
				{children}
			</div>
		</div>
	);
};

export default Modal;
