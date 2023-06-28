'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  endDate?: string;
};

const Countdown = ({ endDate }: Props) => {
  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const handleCountDown = () => {
      const MILLISECOND_PER_SECOND = 1000;
      const MILLISECOND_PER_MINUTE = MILLISECOND_PER_SECOND * 60;
      const MILLISECOND_PER_HOUR = MILLISECOND_PER_MINUTE * 60;
      const MILLISECOND_PER_DAY = MILLISECOND_PER_HOUR * 24;
      const remainMils = endDate ? new Date(endDate).getTime() - new Date().getTime() : 0;
      const days = Math.floor(remainMils / MILLISECOND_PER_DAY);
      const hours = Math.floor((remainMils % MILLISECOND_PER_DAY) / MILLISECOND_PER_HOUR);
      const minutes = Math.floor((remainMils % MILLISECOND_PER_HOUR) / MILLISECOND_PER_MINUTE);
      const seconds = Math.floor((remainMils % MILLISECOND_PER_MINUTE) / MILLISECOND_PER_SECOND);
      setRemaining({ days, hours, minutes, seconds });
    };
    handleCountDown();
    const intervalId = setInterval(handleCountDown, 1000);
    return () => clearInterval(intervalId);
  }, [endDate]);

  return (
    <ul className="mt-2.5 grid grid-flow-col justify-start gap-2.5">
      <CountdownItem num={remaining.days} text="days" />
      <CountdownItem num={remaining.hours} text="hrs" />
      <CountdownItem num={remaining.minutes} text="mins" />
      <CountdownItem num={remaining.seconds} text="secs" />
    </ul>
  );
};

export default Countdown;

const timeItemClasses = [
  'h-12.5 w-12.5 rounded bg-[#303030]',
  'flex flex-col text-caption justify-center items-center',
  '[&>p]:uppercase',
];

type CountdownItemProps = {
  num: number;
  text: string;
};

const CountdownItem = ({ num, text }: CountdownItemProps) => {
  return (
    <li className={classcat([timeItemClasses])}>
      <AnimatePresence mode="popLayout">
        <motion.p
          key={num}
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: '0%' }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.75, ease: 'backIn' }}
        >
          {num}
        </motion.p>
      </AnimatePresence>
      <p>{text}</p>
    </li>
  );
};
