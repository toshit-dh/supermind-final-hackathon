import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const teamMembers = [
  {
    name: 'Suryanarayan Panigrahy',
    role: 'Frontend Developer',
    image: 'https://img.lovepik.com/element/45001/3052.png_860.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    instagram: 'https://instagram.com',
  },
  {
    name: 'Toshit Hole',
    role: 'Backend Developer',
    image: 'https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?rs=1&pid=ImgDetMain',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    instagram: 'https://instagram.com',
  },
  {
    name: 'Gaurav Mahadeshwar',
    role: 'UI/UX Designer',
    image: 'https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_1280.png',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    instagram: 'https://instagram.com',
  },
  {
    name: 'Ved Shirur',
    role: 'UI/UX Designer',
    image: 'https://p7.hiclipart.com/preview/980/304/8/computer-icons-user-profile-avatar.jpg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    instagram: 'https://instagram.com',
  },
];

const About = () => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <div className="w-auto py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-center text-white dark:text-white">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                ${theme === 'dark' ? 'bg-gradient-to-r from-black to-blue-900' : 'bg-gradient-to-r from-blue-500 to-purple-500'} 
                text-black rounded-lg shadow-lg overflow-hidden opacity-90
              `}
            >
              <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white">{member.name}</h2>
                <p className="text-gray-200 dark:text-gray-300">{member.role}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
                    <FaLinkedin size={24} />
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                    <FaGithub size={24} />
                  </a>
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400">
                    <FaInstagram size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;