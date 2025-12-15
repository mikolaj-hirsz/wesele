export default function RSVP() {
	return (
		<section id="rsvp" className="px-4 mt-12">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-xl font-heading text-romantic-primary mb-4">
					Potwierdzenie przybycia
				</h2>

				<div className="card-romantic text-center space-y-4">
					{/* SEPARATOR */}
					<div className="flex items-center justify-center gap-3">
						<span className="h-px w-8 bg-romantic-primary/40" />
						<span className="text-romantic-primary text-xs">♥</span>
						<span className="h-px w-8 bg-romantic-primary/40" />
					</div>

					<p className="font-medium">
						Uprzejmie prosimy o potwierdzenie obecności
					</p>

					<p className="text-romantic-primary font-semibold text-lg">
						do dnia 30.06
					</p>

					<p className="text-sm text-muted">
						Potwierdzenia prosimy przesyłać pod wskazane poniżej numery telefonów.
						
					</p>
				</div>
			</div>
		</section>
	);
}
