"use client";

import { useEffect, useRef, useState } from "react";

function pad(number, width) {
  return String(number).padStart(width, "0");
}

export default function Page() {
  const [timeText, setTimeText] = useState("00:00:000");
  const [msDigits, setMsDigits] = useState([0, 0, 0]);
  const rafRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const millis = now.getMilliseconds();

      setTimeText(`${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(millis, 3)}`);

      const hundreds = Math.floor(millis / 100);
      const tens = Math.floor((millis % 100) / 10);
      const ones = millis % 10;
      setMsDigits([hundreds, tens, ones]);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <main className="page">
      <div className="clockText" aria-label="Current time in minutes, seconds, and milliseconds">
        {timeText}
      </div>

      <div className="grid" aria-label="Milliseconds visualization grid">
        {msDigits.map((digit, rowIndex) => (
          <div className="row" key={rowIndex} role="group" aria-label={`Row ${rowIndex + 1} digit ${digit}`}>
            {Array.from({ length: 10 }, (_, idx) => (
              <div
                key={idx}
                className={`cell${idx < digit ? " filled" : ""}`}
                aria-hidden="true"
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}


