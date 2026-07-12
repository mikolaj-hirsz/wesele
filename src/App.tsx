import MobileNav from "./components/MobileNav";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Schedule from "./components/Schedule";
import Menu from "./components/Menu";
import SeatFinder from "./components/SeatFinder/SeatFinder";
import Location from "./components/Location";
import AccessMap from "./components/AccessMap";
import Breakfast from "./components/Breakfast";
import Gifts from "./components/Gifts";
import RSVP from "./components/RSVP";
import PhotoShare from "./components/PhotoShare";
import Contact from "./components/Contact";
import BottomCTA from "./components/BottomCTA";
import Reveal from "./components/Reveal";

const weddingDate = new Date("2026-08-08T15:00:00");

export default function App() {
	return (
		<div className="min-h-screen bg-romantic-bg text-romantic-text font-body">
			<MobileNav />

			<main className="pt-16">
				<Hero weddingDate={weddingDate} />

				<Reveal>
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
				</Reveal>

				<Reveal>
					<section id="schedule" className="px-4 mt-10">
						<div className="max-w-3xl mx-auto">
							<h2 className="text-xl font-heading text-romantic-primary mb-3">
								Harmonogram
							</h2>
							<Schedule />
						</div>
					</section>
				</Reveal>

				<Reveal>
					<Menu />
				</Reveal>

				<Reveal>
					<SeatFinder />
				</Reveal>

				<Location />

				<Reveal>
					<AccessMap />
				</Reveal>

				<Reveal>
					<Breakfast />
				</Reveal>

				<Reveal>
					<Gifts />
				</Reveal>

				<Reveal>
					<RSVP />
				</Reveal>

				<Reveal>
					<PhotoShare />
				</Reveal>

				<Reveal>
					<Contact />
				</Reveal>

				<div id="bottom-sentinel" className="h-px" />

				<div className="h-32" />
			</main>

			<BottomCTA />
		</div>
	);
}
