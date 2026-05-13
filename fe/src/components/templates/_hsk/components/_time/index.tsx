import { useEffect, useRef, useState } from "react";

export default function Timer({ initial }: { initial: number }) {
  const [time, setTime] = useState(initial);
  const ref = useRef(initial);

  useEffect(() => {
    const timer = setInterval(() => {
      ref.current -= 1;
      setTime(ref.current);

      if (ref.current <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const m = Math.floor(time / 60);
  const s = time % 60;

  return (
    <span>
      {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
    </span>
  );
}
