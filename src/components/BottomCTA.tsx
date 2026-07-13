import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BottomCTA() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const heroSection = document.getElementById("hero");
		if (!heroSection) return;

		// Show the button only once the hero has scrolled out of view —
		// no point offering "back to top" while already at the top.
		const observer = new IntersectionObserver(
			([entry]) => setVisible(!entry.isIntersecting),
			{ threshold: 0 },
		);

		observer.observe(heroSection);
		return () => observer.disconnect();
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			type="button"
			onClick={scrollToTop}
			aria-label="Wróć na górę"
			aria-hidden={!visible}
			tabIndex={visible ? 0 : -1}
			className={`
				focus-ring
				fixed
				right-4
				bottom-4
				z-50
				w-12
				h-12
				rounded-full
				bg-romantic-primary
				text-white
				shadow-lg
				flex
				items-center
				justify-center
				transition-all
				duration-300
				hover:scale-105
				${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}
			`}
		>
			<ArrowUp size={20} />
		</button>
	);
}
