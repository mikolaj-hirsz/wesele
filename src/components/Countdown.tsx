import { useEffect, useState } from "react";

interface Props {
  targetDate: Date;
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculate(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor(diff / (1000 * 60 * 60)) % 24,
    minutes: Math.floor(diff / (1000 * 60)) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="card-romantic min-w-[72px] text-center">
      <div className="text-2xl font-semibold text-romantic-primary tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}

export default function Countdown({ targetDate }: Props) {
  const [time, setTime] = useState<TimeLeft>(() => calculate(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(calculate(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-3">
      <TimeBox label="dni" value={time.days} />
      <TimeBox label="godz" value={time.hours} />
      <TimeBox label="min" value={time.minutes} />
      <TimeBox label="sek" value={time.seconds} />
    </div>
  );
}
