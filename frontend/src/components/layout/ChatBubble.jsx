import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ChatBubble() {
  return (
    <div className="fixed bottom-6 right-5 z-[80] md:bottom-8 md:right-8">
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link
          to="/contact"
          aria-label="Go to contact"
          className="flex h-14 w-14 items-center justify-center rounded-full border border-purple-400/28 bg-gradient-to-br from-purple-600/75 to-indigo-700/75 text-white shadow-[0_0_28px_rgba(168,85,247,0.22)] backdrop-blur-md"
        >
          <MessageCircle className="h-6 w-6" />
        </Link>
      </motion.div>
    </div>
  );
}
