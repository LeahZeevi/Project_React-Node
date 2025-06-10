import  { useEffect, useState } from 'react';

type CountUpProps = {
  target: number;
  duration?: number;
};

const CountUp = ({ target, duration = 1000 }: CountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / (duration / 16); 

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
