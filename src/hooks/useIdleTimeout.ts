import { useEffect, useRef } from "react";

type IdleTimeoutOptions = {
  timeoutMs: number;
  onIdle: () => void;
};

export function useIdleTimeout({
  timeoutMs,
  onIdle,
}: IdleTimeoutOptions) {
  const timerRef = useRef<number | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(onIdle, timeoutMs);
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // start timer on mount

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );

      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return null;
}
