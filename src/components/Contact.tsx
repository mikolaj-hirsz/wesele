export default function Contact() {
	return (
		<section id="contact" className="px-4 mt-8">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-xl font-heading text-romantic-primary mb-3">
					Kontakt
				</h2>

				<div className="card-romantic space-y-2">
					<p>
						<strong>Wiktoria</strong>{" "}
						<a
							href="tel:+48537404419"
							aria-label="Zadzwoń do Wiktorii"
							className="text-romantic-primary"
						>
							+48 537 404 419
						</a>
					</p>
					<p>
						<strong>Mikołaj</strong>{" "}
						<a
							href="tel:+48507987474"
							aria-label="Zadzwoń do Mikołaja"
							className="text-romantic-primary"
						>
							+48 507 987 474
						</a>
					</p>
				</div>
			</div>
		</section>
	);
}
