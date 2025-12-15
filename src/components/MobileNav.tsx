import { useState } from "react";

export default function MobileNav() {
	const [open, setOpen] = useState(false);

	return (
		<header className="fixed inset-x-0 top-0 z-50 bg-romantic-surface/95 backdrop-blur border-b border-romantic-secondary">
			<div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-full bg-romantic-primary/10 flex items-center justify-center text-romantic-primary font-semibold">
						W&M
					</div>
					<span className="font-heading text-romantic-text text-lg">
						Wiktoria & Mikołaj
					</span>
				</div>

				{/* DESKTOP NAV */}
				<nav className="hidden sm:flex gap-4">
					<a href="#countdown" className="hover:text-romantic-primary">
						Odliczanie
					</a>
					<a href="#schedule" className="hover:text-romantic-primary">
						Harmonogram
					</a>
					<a href="#menu" className="hover:text-romantic-primary">
						Menu
					</a>
					<a href="#rsvp" className="hover:text-romantic-primary">
						Potwierdzenie
					</a>
					<a href="#location" className="hover:text-romantic-primary">
						Miejsce
					</a>
					<a href="#contact" className="hover:text-romantic-primary">
						Kontakt
					</a>
				</nav>

				{/* MOBILE TOGGLE */}
				<button
					aria-label="Menu"
					aria-expanded={open}
					onClick={() => setOpen((v) => !v)}
					className="sm:hidden p-2 rounded-md focus:ring ring-romantic-primary/30"
				>
					<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
						<path
							d="M4 7h16M4 12h16M4 17h16"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</button>
			</div>

			{/* MOBILE MENU */}
			{open && (
				<div className="sm:hidden border-t border-romantic-secondary bg-romantic-surface">
					<ul className="flex flex-col p-4 gap-2">
						<li>
							<a href="#countdown" onClick={() => setOpen(false)}>
								Odliczanie
							</a>
						</li>
						<li>
							<a href="#schedule" onClick={() => setOpen(false)}>
								Harmonogram
							</a>
						</li>
						<li>
							<a href="#menu" onClick={() => setOpen(false)}>
								Menu
							</a>
						</li>
						<li>
							<a href="#location" onClick={() => setOpen(false)}>
								Miejsce
							</a>
						</li>
            <li>
							<a href="#rsvp" onClick={() => setOpen(false)}>
								Potwierdzenie
							</a>
						</li>
						<li>
							<a href="#contact" onClick={() => setOpen(false)}>
								Kontakt
							</a>
						</li>
					</ul>
				</div>
			)}
		</header>
	);
}
