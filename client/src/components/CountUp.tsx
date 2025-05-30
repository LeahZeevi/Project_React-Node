import React, { useEffect, useState } from 'react';

type CountUpProps = {
  target: number; // המספר שאליו רוצים להגיע
  duration?: number; // משך האנימציה במילישניות (ברירת מחדל: 1000ms)
};

const CountUp = ({ target, duration = 1000 }: CountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / (duration / 16); // בערך 60FPS

    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(interval);
        setCount(target);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [target, duration]);

  return <span>{count}</span>;
};

export default CountUp;
