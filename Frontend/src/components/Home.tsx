import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  const go = useNavigate();
  const zodiacSigns = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];
  const [pred,setPred] = useState("")
  const[zodiacSign, setZodiacSign] = useState('');
  const handleViewPrediction = async () => {
    const response = await fetch(`http://localhost:5000/daily?zodiac_sign=${zodiacSign}`)
    const { data } = await response.json()
    const text = data.daily_prediction.prediction
    console.log(text);
    
    
  
    setPred(text)
  };
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
              Welcome to Soul Buddy
              <span>
                <TypeAnimation
                  sequence={['Serenity', 1000, 'Enlightment', 1000, 'Transcendance', 1000]}
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
              Join us for an exciting journey of astrology
            </p>
            <div className="flex flex-col p-4 space-y-4">
              {/* Zodiac Sign Dropdown */}
              <div className="w-full max-w-xs">
                <select
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={zodiacSign}
                  onChange={(e) => setZodiacSign(e.target.value)}
                >
                  <option value="">Select your Zodiac sign</option>
                  {zodiacSigns.map((sign, index) => (
                    <option key={index} value={sign}>
                      {sign}
                    </option>
                  ))}
                </select>
              </div>
              <AwesomeButton
              className='w-3/5 justify-center items-center'
              type='primary'
                onPress={handleViewPrediction}
                disabled={!zodiacSign}
              >
                View Today's Prediction
              </AwesomeButton>{
                pred != "" && (
                  <p className='text-justify'>
                    {
                      pred
                    }
                  </p>
                )
              }
            </div> 
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
            Soul Buddy
          </h2>
          <p className="text-xl dark:text-darkBlue-100">
            A Soul Buddy is a spiritual companion who deeply understands, supports, and helps you grow through life’s journey.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
