import { Ban, Flower2, Gift, Home, Wine } from "lucide-react";

const notThis = [
	{ icon: Flower2, label: "Kwiaty" },
	{ icon: Wine, label: "Alkohol" },
	{ icon: Gift, label: "Prezenty" },
];

function NotThisChip({
	icon: Icon,
	label,
}: {
	icon: typeof Flower2;
	label: string;
}) {
	return (
		<div className="flex flex-col items-center gap-2">
			<div className="relative">
				<div className="w-14 h-14 rounded-full bg-romantic-secondary/30 flex items-center justify-center">
					<Icon size={22} className="text-romantic-text/50" />
				</div>

				<div
					className="
						absolute
						-top-1
						-right-1
						w-5
						h-5
						rounded-full
						bg-romantic-surface
						border
						border-romantic-secondary
						flex
						items-center
						justify-center
						shadow-sm
					"
				>
					<Ban size={11} className="text-romantic-primary" />
				</div>
			</div>

			<span className="text-xs text-muted">{label}</span>
		</div>
	);
}

export default function Gifts() {
	return (
		<section id="gifts" className="px-4 mt-12 scroll-mt-20">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-xl font-heading text-romantic-primary mb-4">
					Prezenty
				</h2>

				<div className="card-romantic text-center">
					<p className="text-sm text-muted mb-6">
						Największym prezentem jest dla nas Wasza obecność.
					</p>

					<div className="flex items-center justify-center gap-6 sm:gap-10">
						{notThis.map((item) => (
							<NotThisChip
								key={item.label}
								icon={item.icon}
								label={item.label}
							/>
						))}
					</div>

					{/* DIVIDER */}
					<div className="flex flex-col items-center gap-1 my-6">
						<span className="w-px h-6 bg-romantic-primary/30" />
						<span className="text-romantic-primary text-xs">♥</span>
						<span className="w-px h-6 bg-romantic-primary/30" />
					</div>

					{/* INSTEAD */}
					<div className="flex flex-col items-center">
						<div className="w-16 h-16 rounded-full bg-romantic-primary/10 flex items-center justify-center mb-4">
							<Home size={26} className="text-romantic-primary" />
						</div>

						<p className="font-heading text-lg text-romantic-text">
							Wesprzyjcie nasz wspólny dom
						</p>

						<p className="text-sm text-muted mt-2 max-w-sm">
							Jeśli chcielibyście nas czymś obdarować, będziemy ogromnie
							wdzięczni za wsparcie w budowaniu naszego przyszłego mieszkania.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
