import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const setActivePage = useNavigate()
  return (
    <nav 
      className={`
        ${theme === 'light' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-black to-blue-900'} 
        text-white p-4 sticky top-0 z-10 opacity-90 
      `} 
    > 
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button onClick={() => setActivePage('home')} className="text-2xl font-bold">Hackathon</button>
        </motion.div>
        <motion.ul
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex space-x-4 items-center"
        >
          <li><button onClick={() => setActivePage('/')} className="hover:text-gray-300 dark:hover:text-darkBlue-100">Home</button></li>
          <li><button onClick={() => setActivePage('/about')} className="hover:text-gray-300 dark:hover:text-darkBlue-100">About</button></li>
          <li><button onClick={() => setActivePage('/contact')} className="hover:text-gray-300 dark:hover:text-darkBlue-100">Contact</button></li>
          <li><button onClick={() => setActivePage('/help')} className="hover:text-gray-300 dark:hover:text-darkBlue-100">Help</button></li>
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-700 dark:bg-darkBlue-600 hover:bg-gray-600 dark:hover:bg-darkBlue-800 transition-colors duration-200"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
          </li>
        </motion.ul>
      </div>
    </nav>
  );
};

export default Navbar;