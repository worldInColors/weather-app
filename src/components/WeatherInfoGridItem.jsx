import { motion, AnimatePresence } from "motion/react";

function WeatherInfoGridItem({
  label,
  value,
  className = "",
  loading = false,
  animationKey,
}) {
  return (
    <div
      className={`flex flex-col gap-6 rounded-xl border border-neutral-600 bg-neutral-800 p-5 md:flex-1 ${className}`}
    >
      <h3 className="text-preset-6">{label}</h3>
      {loading ? (
        <p className="text-preset-3">{value}</p>
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
    </div>
  );
}

export default WeatherInfoGridItem;
