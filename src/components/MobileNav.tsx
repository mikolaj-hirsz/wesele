import { useEffect, useRef, useState } from "react";
import {
	Armchair,
	CalendarClock,
	Camera,
	MapPin,
	Phone,
	Timer,
	UtensilsCrossed,
	X,
	type LucideIcon,
} from "lucide-react";

type NavLink = {
	href: string;
	label: string;
	icon: LucideIcon;
	highlight?: boolean;
	subtitle?: string;
};

const links: NavLink[] = [
	{ href: "#countdown", label: "Odliczanie", icon: Timer },
	{ href: "#schedule", label: "Harmonogram", icon: CalendarClock },
	{ href: "#menu", label: "Menu", icon: UtensilsCrossed },
	{
		href: "#seats",
		label: "Znajdź miejsce",
		icon: Armchair,
		highlight: true,
		subtitle: "Sprawdź, gdzie usiądziesz",
	},
	{ href: "#location", label: "Dojazd", icon: MapPin },
	{ href: "#photos", label: "Dodaj zdjęcia", icon: Camera },
	{ href: "#contact", label: "Kontakt", icon: Phone },
];

const prefersReducedMotion = () =>
	typeof window !== "undefined" &&
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function MobileNav() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [activeHref, setActiveHref] = useState<string | null>(null);
	const [pillRect, setPillRect] = useState<{
		left: number;
		top: number;
		width: number;
		height: number;
	} | null>(null);

	const navRef = useRef<HTMLElement>(null);
	const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

	// Highlights the nav link for whichever section is currently in view.
	useEffect(() => {
		const sections = links
			.map((l) => document.getElementById(l.href.slice(1)))
			.filter((el): el is HTMLElement => el !== null);

		if (!sections.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible.length > 0) {
					setActiveHref(`#${visible[0].target.id}`);
				}
			},
			{ rootMargin: "-90px 0px -60% 0px", threshold: 0 },
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, []);

	// Tracks scroll position to add a subtle elevation once the page moves.
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Locks background scroll while the mobile menu is open.
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	// Measures the active desktop link so the sliding pill can glide to it.
	useEffect(() => {
		const updatePill = () => {
			const navEl = navRef.current;
			const activeIndex = links.findIndex((l) => l.href === activeHref);
			const linkEl = linkRefs.current[activeIndex];

			if (navEl && linkEl) {
				const navRect = navEl.getBoundingClientRect();
				const linkRect = linkEl.getBoundingClientRect();
				setPillRect({
					left: linkRect.left - navRect.left,
					top: linkRect.top - navRect.top,
					width: linkRect.width,
					height: linkRect.height,
				});
			} else {
				setPillRect(null);
			}
		};

		updatePill();
		window.addEventListener("resize", updatePill);
		return () => window.removeEventListener("resize", updatePill);
	}, [activeHref]);

	const overlayAnimation = prefersReducedMotion()
		? "navOverlayFadeSimple 0.2s ease-out both"
		: "navOverlayReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) both";

	return (
		<>
			<header
				className={`
					fixed inset-x-0 top-0 z-50
					bg-romantic-surface/95 backdrop-blur
					border-b transition-all duration-300
					${scrolled ? "border-romantic-secondary shadow-sm" : "border-transparent"}
				`}
			>
				<style>{`
					@keyframes navLinkFadeIn {
						from { opacity: 0; transform: translateY(10px); }
						to { opacity: 1; transform: translateY(0); }
					}
					@keyframes navOverlayReveal {
						from { clip-path: circle(0% at calc(100% - 2.25rem) 1.75rem); opacity: 0.5; }
						to { clip-path: circle(150% at calc(100% - 2.25rem) 1.75rem); opacity: 1; }
					}
					@keyframes navOverlayFadeSimple {
						from { opacity: 0; }
						to { opacity: 1; }
					}
				`}</style>

				{/*
					Wider than the page's max-w-3xl content column on purpose —
					the nav needs room for the brand name + 7 links + the
					highlighted pill on desktop, which a narrow column can't fit
					without wrapping. Content sections below keep their own
					max-w-3xl independently.
				*/}
				<div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
					{/* BRAND */}
					<div className="flex items-center gap-3 shrink-0">
						<div className="w-10 h-10 rounded-full bg-romantic-primary/10 flex items-center justify-center text-romantic-primary font-semibold shrink-0">
							W&M
						</div>
						<span className="font-heading text-romantic-text text-lg tracking-wide whitespace-nowrap">
							Wiktoria & Mikołaj
						</span>
					</div>

					{/* DESKTOP NAV — sliding pill indicator */}
					<nav
						ref={navRef}
						className="hidden lg:flex items-center gap-0.5 text-sm relative shrink-0"
					>
						{pillRect && (
							<span
								aria-hidden
								className="absolute rounded-full bg-romantic-primary/10 transition-all duration-300 ease-out pointer-events-none"
								style={{
									left: pillRect.left,
									top: pillRect.top,
									width: pillRect.width,
									height: pillRect.height,
								}}
							/>
						)}

						{links.map((l, i) => {
							const isActive = activeHref === l.href;

							return (
								<a
									key={l.href}
									ref={(el) => {
										linkRefs.current[i] = el;
									}}
									href={l.href}
									aria-current={isActive ? "true" : undefined}
									className={`
										focus-ring relative z-10
										flex items-center gap-1.5
										whitespace-nowrap
										px-3 py-2 rounded-full
										transition-colors duration-200
										${l.highlight ? "border border-romantic-primary/30" : ""}
										${
											isActive
												? "text-romantic-primary font-medium"
												: l.highlight
													? "text-romantic-primary/90 font-medium hover:text-romantic-primary"
													: "text-romantic-text hover:text-romantic-primary"
										}
									`}
								>
									{l.highlight && (
										<span className="relative flex h-1.5 w-1.5 shrink-0">
											<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-romantic-primary opacity-75" />
											<span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-romantic-primary" />
										</span>
									)}
									{l.label}
								</a>
							);
						})}
					</nav>

					{/* MOBILE TOGGLE — morphs between hamburger and close icon */}
					<button
						type="button"
						aria-label={open ? "Zamknij menu" : "Otwórz menu"}
						aria-expanded={open}
						onClick={() => setOpen((v) => !v)}
						className="focus-ring lg:hidden relative w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-romantic-primary/10 shrink-0"
					>
						<svg
							className={`w-6 h-6 absolute transition-all duration-200 ${
								open
									? "opacity-0 rotate-45 scale-75"
									: "opacity-100 rotate-0 scale-100"
							}`}
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M4 7h16M4 12h16M4 17h16"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>

						<X
							size={22}
							className={`absolute text-romantic-primary transition-all duration-200 ${
								open
									? "opacity-100 rotate-0 scale-100"
									: "opacity-0 -rotate-45 scale-75"
							}`}
						/>
					</button>
				</div>
			</header>

			{/* MOBILE MENU — sibling of <header>, see note in earlier fix re: backdrop-blur + fixed positioning */}
			{open && (
				<div
					className="lg:hidden fixed inset-0 top-[57px] z-[60] bg-romantic-bg overflow-hidden flex flex-col"
					style={{ animation: overlayAnimation }}
				>
					{/* decorative soft blobs, purely visual */}
					<div
						aria-hidden
						className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-romantic-primary/10 blur-3xl pointer-events-none"
					/>
					<div
						aria-hidden
						className="absolute bottom-10 -left-16 w-56 h-56 rounded-full bg-romantic-secondary/30 blur-3xl pointer-events-none"
					/>

					<div className="relative flex flex-col items-center justify-center flex-1 px-6">
						{/* ORNAMENT */}
						<div className="flex items-center gap-3 mb-8">
							<span className="h-px w-10 bg-romantic-primary/40" />
							<span className="text-romantic-primary text-sm">♥</span>
							<span className="h-px w-10 bg-romantic-primary/40" />
						</div>

						<ul className="flex flex-col gap-1 w-full max-w-xs">
							{links.map((l, i) => {
								const isActive = activeHref === l.href;
								const Icon = l.icon;
								const delay = i * 0.05;
								const emphasized = isActive || l.highlight;

								return (
									<li
										key={l.href}
										style={{
											animation: prefersReducedMotion()
												? undefined
												: `navLinkFadeIn 0.4s ease-out ${delay}s both`,
										}}
									>
										<a
											href={l.href}
											onClick={() => setOpen(false)}
											aria-current={isActive ? "true" : undefined}
											className={`
												focus-ring
												flex items-center gap-4
												w-full py-2.5 px-2
												rounded-2xl
												transition-colors duration-200
												${isActive ? "bg-romantic-primary/10" : l.highlight ? "bg-romantic-primary/5" : "hover:bg-romantic-primary/5"}
												${l.highlight ? "border border-romantic-primary/20" : ""}
											`}
										>
											<span
												className={`
													relative
													w-10 h-10 shrink-0 rounded-full
													flex items-center justify-center
													transition-colors duration-200
													${
														emphasized
															? "bg-romantic-primary text-white"
															: "bg-romantic-primary/10 text-romantic-primary"
													}
												`}
											>
												<Icon size={18} />

												{l.highlight && (
													<span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
														<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-romantic-primary opacity-60" />
														<span className="relative inline-flex rounded-full h-3 w-3 bg-romantic-primary border-2 border-romantic-bg" />
													</span>
												)}
											</span>

											<span className="flex flex-col items-start">
												<span
													className={`font-heading text-lg tracking-wide leading-tight ${
														emphasized
															? "text-romantic-primary"
															: "text-romantic-text"
													}`}
												>
													{l.label}
												</span>

												{l.subtitle && (
													<span className="text-[11px] text-romantic-primary/70 tracking-wide">
														{l.subtitle}
													</span>
												)}
											</span>
										</a>
									</li>
								);
							})}
						</ul>
					</div>

					<p className="relative text-center text-xs text-muted pb-8">
						8 sierpnia 2026 • Folwark Dajak
					</p>
				</div>
			)}
		</>
	);
}
