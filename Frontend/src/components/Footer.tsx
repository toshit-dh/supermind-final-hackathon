import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface FooterProps {
  setActivePage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const { theme } = useTheme();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        ${theme === 'dark' 
          ? 'bg-gradient-to-b from-black to-blue-900' 
          : 'bg-gradient-to-b from-blue-500 to-purple-500'} 
        text-white dark:text-darkBlue-100 py-8 
        opacity-90 
      `} 
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Hackathon</h3>
            <p>Innovate. Create. Collaborate.</p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-gray-300 dark:hover:text-darkBlue-600">Home</button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-gray-300 dark:hover:text-darkBlue-600">About</button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-gray-300 dark:hover:text-darkBlue-600">Contact</button>
              </li>
              <li>
                <button onClick={() => setActivePage('help')} className="hover:text-gray-300 dark:hover:text-darkBlue-600">Help</button>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">Connect With Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300 dark:hover:text-darkBlue-600">Facebook</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 dark:hover:text-darkBlue-600">Twitter</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 dark:hover:text-darkBlue-600">LinkedIn</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 dark:hover:text-darkBlue-600">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 Hackathon. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;