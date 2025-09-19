export const dropDownAnimation = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      duration: 0.2,
    },
  },
  exit: { opacity: 0, y: -10, scale: 0.95 },
};
