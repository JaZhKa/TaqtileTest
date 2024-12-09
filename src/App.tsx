import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Home from './routes/Home';
import Tasks from './routes/Tasks';
import Contacts from './routes/Contacts';
import './styles/App.css';

const App: React.FC = () => {
	return (
		<Router>
			<Header />
			<div className="app-container">
				<MainContent>
					<Routes>
						<Route
							path="/"
							Component={Home}
						/>
						<Route
							path="/tasks"
							Component={Tasks}
						/>
						<Route
							path="/contact"
							Component={Contacts}
						/>
					</Routes>
				</MainContent>
			</div>
		</Router>
	);
};

export default App;
