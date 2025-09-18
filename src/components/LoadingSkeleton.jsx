import { motion } from "motion/react";

function LoadingSkeleton({ className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded ${className}`}>
      <div className="h-full w-full bg-neutral-700" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-600 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    </div>
  );
}

export default LoadingSkeleton;
