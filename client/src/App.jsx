import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import MyFooter from './components/MyFooter';
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
      <div className='min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white'>
        <Outlet />
      </div>
      <MyFooter />
    </div>
  );
}

export default App;
