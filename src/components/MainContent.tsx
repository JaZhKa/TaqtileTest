import '../styles/MainContent.module.css';

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className="main-content">{children}</div>;
};

export default MainContent;
