import { Coffee } from "lucide-react";

const BREAKFAST_TIME = "9:00 – 11:00";

export default function Breakfast() {
	return (
		<section id="breakfast" className="px-4 mt-8 scroll-mt-20">
			<div className="max-w-3xl mx-auto">
				<div className="card-romantic flex items-center gap-4">
					<div className="w-12 h-12 shrink-0 rounded-full bg-romantic-primary/10 flex items-center justify-center">
						<Coffee size={20} className="text-romantic-primary" />
					</div>

					<div>
						<p className="font-heading text-romantic-text">
							Śniadanie dla Gości nocujących
						</p>
						<p className="text-sm text-muted mt-0.5">
							Serwowane w godzinach{" "}
							<span className="font-semibold text-romantic-primary">
								{BREAKFAST_TIME}
							</span>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
