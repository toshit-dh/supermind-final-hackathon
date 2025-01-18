import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import SolarSystem from './SolarSystem';
import { Canvas } from '@react-three/fiber';

const Home = () => {
  const go = useNavigate();

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 mb-8 lg:mb-0"
          >
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 dark:text-darkBlue-100">
              Welcome to Our Hackathon
              <span>
                <TypeAnimation
                  sequence={['Innovate', 1000, 'Create', 1000, 'Collaborate', 1000]}
                  wrapper="h2"
                  repeat={Infinity}
                  className="text-3xl lg:text-4xl font-semibold text-blue-600 dark:text-darkBlue-600"
                />
              </span>
            </h1>
            <AwesomeButton
              type="primary"
              ripple={true}
              onPress={() => {
                go('/analyze');
              }}
            >
              Get Started
            </AwesomeButton>
            <p className="mt-4 text-xl dark:text-darkBlue-100">
              Join us for an exciting journey of innovation and creativity!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            {/* SolarSystem component inside the Canvas */}
            {/* <Canvas>
              <SolarSystem />
            </Canvas> */}
            <img src="meditate.webp" alt="Image" className='h-auto' />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 dark:text-darkBlue-100">
            Project Details
          </h2>
          <p className="text-xl dark:text-darkBlue-100">
            Our hackathon project aims to solve real-world problems using cutting-edge technology.
            We're focusing on creating innovative solutions in areas such as AI, blockchain, and IoT.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
