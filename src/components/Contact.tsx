import { MessageCircle, Phone } from "lucide-react";

const contacts = [
	{ name: "Wiktoria", phone: "+48537404419", display: "+48 537 404 419" },
	{ name: "Mikołaj", phone: "+48507987474", display: "+48 507 987 474" },
];

export default function Contact() {
	return (
		<section id="contact" className="px-4 mt-8 scroll-mt-20">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-xl font-heading text-romantic-primary mb-3">
					Kontakt
				</h2>

				<div className="card-romantic space-y-1">
					{contacts.map((c) => (
						<div
							key={c.name}
							className="
								flex
								items-center
								justify-between
								gap-3
								py-3
								border-b
								last:border-0
								border-romantic-secondary/60
							"
						>
							<div className="flex items-center gap-3 min-w-0">
								<div className="w-10 h-10 rounded-full bg-romantic-primary/10 flex items-center justify-center shrink-0">
									<Phone size={16} className="text-romantic-primary" />
								</div>

								<div className="min-w-0">
									<p className="font-medium text-romantic-text">{c.name}</p>
									<p className="text-xs text-muted truncate">{c.display}</p>
								</div>
							</div>

							<div className="flex items-center gap-2 shrink-0">
								<a
									href={`tel:${c.phone}`}
									aria-label={`Zadzwoń do ${c.name}`}
									className="
										focus-ring
										w-9
										h-9
										rounded-full
										bg-romantic-primary/10
										flex
										items-center
										justify-center
										text-romantic-primary
										transition
										hover:bg-romantic-primary/20
									"
								>
									<Phone size={15} />
								</a>

								<a
									href={`sms:${c.phone}`}
									aria-label={`Napisz SMS do ${c.name}`}
									className="
										focus-ring
										w-9
										h-9
										rounded-full
										bg-romantic-primary/10
										flex
										items-center
										justify-center
										text-romantic-primary
										transition
										hover:bg-romantic-primary/20
									"
								>
									<MessageCircle size={15} />
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
