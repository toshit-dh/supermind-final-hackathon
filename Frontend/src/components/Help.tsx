import { motion } from 'framer-motion';

const Help = () => {
  return (
    <div className="w-full py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-center text-white dark:text-white">Help Center</h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-white dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-darkBlue-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                How do I register for the hackathon?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                To register for the hackathon, visit our registration page and fill out the required information. Make sure to submit your application before the deadline.
              </p>
            </div>
            <div className="bg-white dark:bg-darkBlue-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                What are the rules for the hackathon?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                The rules for the hackathon can be found in our official rulebook. Please review them carefully before participating to ensure compliance with all guidelines.
              </p>
            </div>
            <div className="bg-white dark:bg-darkBlue-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                How are projects evaluated?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Projects are evaluated based on criteria such as innovation, technical complexity, presentation, and potential impact. A panel of judges will review each submission and provide scores.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-white dark:text-white">Need More Help?</h2>
            <p className="mb-4 text-gray-200 dark:text-gray-300">
              If you can't find the answer to your question, feel free to reach out to our support team:
            </p>
            <ul className="list-disc list-inside text-gray-200 dark:text-gray-300">
              <li>
                Email:{' '}
                <a href="mailto:support@hackathon.com" className="text-blue-400 hover:underline">
                  support@hackathon.com
                </a>
              </li>
              <li>Phone: +1 (987) 654-3210</li>
              <li>Live Chat: Available on our website during business hours</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;

