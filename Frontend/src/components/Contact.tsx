import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="w-full py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-center text-white dark:text-white">Contact Us</h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-darkBlue-800 rounded-lg shadow-lg p-8"
        >
          <p className="text-xl mb-4 text-gray-900 dark:text-white">Get in touch with us for any inquiries or support:</p>
          <ul className="space-y-2 text-gray-800 dark:text-gray-200 mb-6">
            <li>
              <strong className="text-gray-900 dark:text-white">Email:</strong>{' '}
              <a href="mailto:contact@hackathon.com" className="text-blue-600 hover:underline dark:text-blue-400">
                contact@hackathon.com
              </a>
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Phone:</strong> +1 (123) 456-7890
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Address:</strong> 123 Hackathon Street, Tech City, TC 12345
            </li>
          </ul>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 text-gray-900 dark:text-white">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded-lg dark:bg-darkBlue-900 dark:text-white dark:border-darkBlue-600"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-900 dark:text-white">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg dark:bg-darkBlue-900 dark:text-white dark:border-darkBlue-600"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 text-gray-900 dark:text-white">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 border rounded-lg dark:bg-darkBlue-900 dark:text-white dark:border-darkBlue-600"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors dark:bg-darkBlue-600 dark:hover:bg-darkBlue-700"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

