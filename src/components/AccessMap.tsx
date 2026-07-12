import { MapPinned } from "lucide-react";
import accessMap from "../assets/access-map.png";

export default function AccessMap() {
	return (
		<section id="access-map" className="px-4 mt-8 scroll-mt-20">
			<div className="max-w-3xl mx-auto">
				<div className="card-romantic">
					<div className="flex items-center gap-2 mb-4">
						<MapPinned className="text-romantic-primary" size={22} />

						<h3 className="font-heading text-lg text-romantic-text">
							Jak do nas dojechać
						</h3>
					</div>

					<p className="text-sm text-muted mb-4">
						Poniżej znajduje się poglądowa mapa dojazdu do Folwarku Dajak.
					</p>

					<div className="overflow-hidden rounded-2xl border border-romantic-secondary shadow-sm">
						<img
							src={accessMap}
							alt="Mapa dojazdu do Folwarku Dajak"
							className="w-full h-auto object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
