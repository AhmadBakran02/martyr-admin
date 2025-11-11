import { motion } from "framer-motion";

export default function MartyrCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "easeInOut",
        repeatType: "reverse",
      }}
      className="w-full bg-gray-200 rounded-xl p-5 shadow-sm animate-pulse"
    >
      <div className="flex flex-col gap-3">
        <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
        <div className="w-full h-32 bg-gray-300 rounded-xl"></div>
      </div>
    </motion.div>
  );
}
