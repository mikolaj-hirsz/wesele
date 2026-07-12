import { Camera } from "lucide-react";

const PHOTO_ALBUM_URL = "https://photos.app.goo.gl/G1o6GsX7o1cGviKR8";

export default function PhotoShare() {
	return (
		<section id="photos" className="px-4 mt-12 scroll-mt-20">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-xl font-heading text-romantic-primary mb-4">
					Wspólny album
				</h2>

				<div className="card-romantic text-center">
					<div className="flex justify-center mb-4">
						<div className="w-16 h-16 rounded-full bg-romantic-primary/10 flex items-center justify-center">
							<Camera size={28} className="text-romantic-primary" />
						</div>
					</div>

					<p className="text-sm text-muted mb-6 max-w-sm mx-auto">
						Macie zdjęcia lub filmy z naszego wesela? Wrzućcie je do wspólnego
						albumu — chcemy zobaczyć ten dzień Waszymi oczami.
					</p>

					<a
						href={PHOTO_ALBUM_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="
							focus-ring
							inline-flex
							items-center
							justify-center
							gap-2
							w-full
							sm:w-auto
							px-8
							py-3.5
							rounded-full
							bg-romantic-primary
							text-white
							shadow
							transition
							hover:scale-[1.02]
						"
					>
						<Camera size={18} />
						Dodaj zdjęcia
					</a>
				</div>
			</div>
		</section>
	);
}
