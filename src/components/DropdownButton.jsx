import { CheckIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
function DropdownButton({ onClick, children, isSelected }) {
  return (
    <button
      onClick={onClick}
      className={`text-preset-7 group relative w-full cursor-pointer overflow-hidden rounded-lg px-2 py-3 text-left transition-colors outline-none focus:ring-2 focus:ring-neutral-0 ${
        isSelected ? "bg-neutral-700" : ""
      }`}
    >
      <div className="absolute inset-0 -translate-x-full transform bg-neutral-700 transition-transform duration-300 ease-out group-hover:translate-x-0" />

      <div className="relative z-10 flex items-center justify-between">
        {children}
        <span>
          <AnimatePresence>
            {isSelected && (
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.path
                  d="M20 6L9 17l-5-5"
                  variants={{
                    hidden: { pathLength: 0, pathOffset: 1, opacity: 0 },
                    visible: { pathLength: 1, pathOffset: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </span>
      </div>
    </button>
  );
}

export { DropdownButton };
