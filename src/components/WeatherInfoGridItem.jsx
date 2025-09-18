import { motion, AnimatePresence } from "motion/react";
import LoadingSkeleton from "./LoadingSkeleton";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

function WeatherInfoGridItem({
  label,
  value,
  className = "",
  loading = false,
  animationKey,
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={`flex flex-col gap-6 rounded-xl border border-neutral-600 bg-neutral-800 p-5 md:flex-1 ${className}`}
    >
      <h3 className="text-preset-6">{label}</h3>
      {loading ? (
        <LoadingSkeleton className="h-9 w-20" />
      ) : (
        <AnimatePresence mode="wait">
          <motion.p
            key={animationKey}
            className="text-preset-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {value}
          </motion.p>
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export default WeatherInfoGridItem;
