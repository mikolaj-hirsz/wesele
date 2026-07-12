import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
	children: ReactNode;
	/** Optional delay in ms, useful for staggering multiple children */
	delay?: number;
	className?: string;
};

/**
 * Fades + slides content in once it enters the viewport.
 * Wrap any section (or card) with this for a subtle premium entrance.
 * Respects prefers-reduced-motion — becomes an instant no-op transition.
 */
export default function Reveal({ children, delay = 0, className = "" }: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (prefersReducedMotion) {
			setIsVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={`transition-all duration-700 ease-out ${
				isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
			} ${className}`}
			style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
		>
			{children}
		</div>
	);
}
