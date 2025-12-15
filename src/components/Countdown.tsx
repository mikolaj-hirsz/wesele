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

function Segment({ value, label }: { value: number; label: string }) {
	return (
		<div className="flex flex-col items-center flex-1">
			<div className="text-3xl font-heading text-romantic-primary tabular-nums">
				{String(value).padStart(2, "0")}
			</div>
			<div className="text-[10px] uppercase tracking-widest text-romantic-muted mt-1">
				{label}
			</div>
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
		<div className="text-center">
			{/* TITLE */}
			<p className="text-romantic-muted text-sm mb-3">
				Do naszego ślubu pozostało
			</p>

			{/* SEPARATOR (ZOSTAJE) */}
			<div className="flex items-center justify-center gap-3 mb-6">
				<span className="h-px w-8 bg-romantic-primary/40" />
				<span className="text-romantic-primary text-xs">♥</span>
				<span className="h-px w-8 bg-romantic-primary/40" />
			</div>

			{/* COUNTDOWN BLOCK */}
			<div
				className="
          bg-romantic-surface
          rounded-2xl
          shadow-sm
          px-4 py-6
          flex
          divide-x
          divide-romantic-secondary
        "
			>
				<Segment label="dni" value={time.days} />
				<Segment label="godz" value={time.hours} />
				<Segment label="min" value={time.minutes} />
				<Segment label="sek" value={time.seconds} />
			</div>
		</div>
	);
}
