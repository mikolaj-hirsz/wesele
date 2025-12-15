export default function Location() {
	return (
		<section id="location" className="px-4 mt-8">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-xl font-heading text-romantic-primary mb-3">
					Miejsce
				</h2>

				<div className="card-romantic">
					<p className="font-medium">Folwark Dajak</p>
					<p className="text-muted">
						Świętopełka Wielkiego 1, 84-207 Koleczkowo
					</p>

					<a
						href="https://maps.app.goo.gl/R1aPQ18DppeQDzZT9"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Otwórz lokalizację Folwark Dajak w Google Maps"
						className="inline-block mt-4 text-romantic-primary underline"
					>
						Otwórz w Google Maps
					</a>

					<p className="text-muted mt-3">
						Parking dostępny na terenie obiektu.
					</p>
				</div>
			</div>
		</section>
	);
}
