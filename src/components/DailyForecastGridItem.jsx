// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

function DailyForecastGridItem({ day, icon, tempMax, tempMin }) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex min-h-[150px] flex-1 flex-col items-center rounded-xl border border-neutral-600 bg-neutral-800 px-[10px] py-4"
    >
      <h3>{day}</h3>
      <img src={icon} alt={day} className="h-15 w-15" />
      <div className="mt-2 flex w-full justify-between text-sm">
        <p className="text-preset-7">{Math.round(tempMax)}°</p>
        <p className="text-preset-7">{Math.round(tempMin)}°</p>
      </div>
    </motion.div>
  );
}

export default DailyForecastGridItem;
