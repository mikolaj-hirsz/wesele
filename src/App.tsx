import MobileNav from "./components/MobileNav";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Schedule from "./components/Schedule";
import Menu from "./components/Menu";
import SeatFinder from "./components/SeatFinder/SeatFinder";
import Location from "./components/Location";
import RSVP from "./components/RSVP";
import Contact from "./components/Contact";

const weddingDate = new Date("2026-08-08T15:00:00");

export default function App() {
	return (
		<div className="min-h-screen bg-romantic-bg text-romantic-text font-body">
			<MobileNav />

			<main className="pt-16">
				{/* HERO */}
				<Hero weddingDate={weddingDate} />

				{/* COUNTDOWN */}
				<section id="countdown" className="px-4 mt-8">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-xl font-heading text-romantic-primary mb-3">
							Odliczanie
						</h2>

						<div className="card-romantic">
							<Countdown targetDate={weddingDate} />
						</div>
					</div>
				</section>

				{/* HARMONOGRAM */}
				<section id="schedule" className="px-4 mt-10">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-xl font-heading text-romantic-primary mb-3">
							Harmonogram
						</h2>

						<Schedule />
					</div>
				</section>

				{/* MENU */}
				<Menu />

				{/* PLAN STOŁÓW */}
				<SeatFinder />

				{/* LOKALIZACJA */}
				<Location />

				{/* RSVP */}
				<RSVP />

				{/* KONTAKT */}
				<Contact />

				<div className="h-32" />
			</main>
		</div>
	);
}
