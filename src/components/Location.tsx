export default function Location() {
	return (
		<section id="location" className="px-4 mt-12">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-xl font-heading text-romantic-primary mb-4">
					Miejsce
				</h2>

				<div className="card-romantic space-y-5">
					{/* NAME */}
					<div>
						<p className="font-heading text-lg text-romantic-text">
							Folwark Dajak
						</p>
						<p className="text-muted flex items-start gap-2 mt-1">
							<span>
								Świętopełka Wielkiego 1<br />
								84-207 Koleczkowo
							</span>
						</p>
					</div>

					{/* CTA */}
					<a
						href="https://maps.app.goo.gl/R1aPQ18DppeQDzZT9"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Otwórz lokalizację Folwark Dajak w Google Maps"
						className="
              inline-flex items-center justify-center
              gap-2
              px-6 py-3
              rounded-full
              bg-romantic-primary
              text-white
              shadow
              transition
              hover:scale-[1.02]
            "
					>
						Otwórz w Google Maps
					</a>

					{/* INFO */}
					<div className="text-muted flex items-start gap-2 text-sm">
						<span aria-hidden>🚗</span>
						<span>Parking dostępny na terenie obiektu.</span>
					</div>
				</div>
			</div>
		</section>
	);
}
