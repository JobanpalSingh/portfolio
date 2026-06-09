import { motion } from 'framer-motion';
import { MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ChatBubble() {
  return (
    <div className="fixed bottom-6 right-5 z-[80] md:bottom-8 md:right-8">
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
        <Link
          to="/contact"
          aria-label="Go to contact"
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white text-purple-900 shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
        >
          <MessagesSquare className="h-6 w-6" strokeWidth={2} />
        </Link>
      </motion.div>
    </div>
  );
}
