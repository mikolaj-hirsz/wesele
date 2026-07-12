import { CalendarCheck, MessageCircle } from "lucide-react";

const RSVP_DEADLINE = "30 czerwca 2026";

const contacts = [
	{ name: "Wiktorii", phone: "+48537404419" },
	{ name: "Mikołaja", phone: "+48507987474" },
];

export default function RSVP() {
	return (
		<section id="rsvp" className="px-4 mt-12 scroll-mt-20">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-xl font-heading text-romantic-primary mb-4">
					Potwierdzenie przybycia
				</h2>

				<div className="card-romantic text-center space-y-5">
					<div className="flex justify-center">
						<div className="w-14 h-14 rounded-full bg-romantic-primary/10 flex items-center justify-center">
							<CalendarCheck size={24} className="text-romantic-primary" />
						</div>
					</div>

					<p className="text-sm text-muted leading-relaxed max-w-sm mx-auto">
						Uprzejmie prosimy o potwierdzenie obecności do dnia{" "}
						<span className="font-semibold text-romantic-primary">
							{RSVP_DEADLINE}
						</span>
						. Wystarczy krótki SMS.
					</p>

					<div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
						{contacts.map((c) => (
							<a
								key={c.name}
								href={`sms:${c.phone}`}
								className="
									focus-ring
									inline-flex
									items-center
									justify-center
									gap-2
									px-5
									py-3
									rounded-full
									bg-romantic-primary/10
									text-romantic-primary
									text-sm
									font-medium
									transition
									hover:bg-romantic-primary/20
								"
							>
								<MessageCircle size={16} />
								Napisz do {c.name}
							</a>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
