import { ArrowRight, Gift, House, Mail } from "lucide-react";

export default function Gifts() {
	return (
		<section id="gifts" className="px-4 mt-12 scroll-mt-20">
			<div className="max-w-3xl mx-auto">
				<div className="card-romantic text-center">
					<div className="flex items-center justify-center gap-3 sm:gap-5">
						{/* GIFT */}
						<div className="w-16 h-16 rounded-full bg-romantic-secondary/30 flex items-center justify-center">
							<Gift size={28} className="text-romantic-text/70" />
						</div>

						<ArrowRight size={22} className="text-romantic-primary/50" />

						{/* ENVELOPE */}
						<div className="w-16 h-16 rounded-full bg-romantic-primary/10 flex items-center justify-center">
							<Mail size={28} className="text-romantic-primary" />
						</div>

						<ArrowRight size={22} className="text-romantic-primary/50" />

						{/* HOUSE */}
						<div className="w-16 h-16 rounded-full bg-romantic-secondary/30 flex items-center justify-center">
							<House size={28} className="text-romantic-text/70" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
