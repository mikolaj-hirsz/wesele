import {
	CakeSlice,
	CookingPot,
	Salad,
	Sandwich,
	Soup,
	UtensilsCrossed,
} from "lucide-react";

const sections = [
	{
		title: "Przystawka",
		icon: Sandwich,
		items: [
			"Folwarczne pasztety",
			"Żurawina",
			"Sos chrzanowy",
			"Świeża bagietka",
		],
	},
	{
		title: "Zupa",
		icon: Soup,
		items: ["Krem z pomidorów", "Oliwa bazyliowa"],
	},
	{
		title: "Desery",
		icon: CakeSlice,
		items: ["Szarlotka z kruszonką", "Sernik tradycyjny", "WZ", "Miodownik"],
	},
	{
		title: "Bufet",
		icon: Salad,
		items: [
			"Tatar wołowy",
			"Mini kanapeczki",
			"Sałatka Caprese",
			"Tartaletki",
			"Vol au vent",
			"Tortilki mięsne",
			"Mini croissanty wytrawne",
			"Swojskie wędliny",
			"Labneh z domową pitą",
			"... i wiele innych przysmaków",
		],
	},
	{
		title: "Kolacja",
		icon: CookingPot,
		items: [
			"Pierś z indyka z żurawiną i gruszką",
			"Ziemniaki w mundurkach z ziołami",
			"Sałata z pomidorkami",
		],
	},
	{
		title: "Nocna zupa",
		icon: Soup,
		items: ["Swojska zupa na wędzonce", "Kiełbasa", "Ziemniaki"],
	},
];

const mainCourses = [
	"Devolay",
	"Polędwiczki wieprzowe w sosie śmietanowo-winnym",
	"Wołowina po burgundzku",
	"Dorsz zapiekany z cytryną i żurawiną",
];

const additions = [
	"Ziemniaki",
	"Kopytka",
	"Frytki",
	"Warzywa pieczone",
	"Surówki sezonowe",
];

export default function Menu() {
	return (
		<section id="menu" className="px-4 mt-12 scroll-mt-20">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-xl font-heading text-romantic-primary mb-4">
					Menu
				</h2>

				<p className="text-sm text-muted mb-5">
					Dania główne serwowane są w półmiskach.
				</p>

				<div className="space-y-4">
					<div className="card-romantic transition-all duration-300 hover:shadow-md">
						<div className="flex items-center gap-3 mb-5">
							<div className="w-10 h-10 rounded-full bg-romantic-primary/10 flex items-center justify-center">
								<UtensilsCrossed size={20} className="text-romantic-primary" />
							</div>

							<div>
								<h3 className="font-heading text-lg text-romantic-text">
									Dania główne
								</h3>

								<p className="text-xs text-muted">
									Serwowane z dodatkami • 4 rodzaje
								</p>
							</div>
						</div>

						<div className="space-y-1">
							{mainCourses.map((item) => (
								<div
									key={item}
									className="py-2 border-b last:border-0 border-romantic-secondary/60"
								>
									{item}
								</div>
							))}
						</div>

						<div className="mt-2 pt-3 border-t border-romantic-secondary/60">
							<p className="text-sm text-muted mb-3">Dodatki</p>

							<div className="flex flex-wrap gap-2">
								{additions.map((item) => (
									<span
										key={item}
										className="px-2.5 py-1 rounded-full bg-romantic-primary/10 text-xs text-romantic-text"
									>
										{item}
									</span>
								))}
							</div>
						</div>
					</div>

					<div className="space-y-3">
						{sections.map((section) => {
							const Icon = section.icon;

							return (
								<div
									key={section.title}
									className="
                    collapse
                    collapse-plus
                    rounded-2xl
                    border
                    border-romantic-secondary
                    bg-romantic-surface
                    transition-all
                    duration-300
                    hover:border-romantic-primary/40
                    hover:shadow-md
                "
								>
									<input type="checkbox" />

									<div className="collapse-title flex items-center gap-3 font-heading text-romantic-text">
										<div className="w-9 h-9 rounded-full bg-romantic-primary/10 flex items-center justify-center">
											<Icon size={18} className="text-romantic-primary" />
										</div>

										<span>{section.title}</span>
									</div>

									<div className="collapse-content">
										<div className="border-t border-romantic-secondary/40 pt-2">
											<div className="space-y-1 text-sm">
												{section.items.map((item) => (
													<div
														key={item}
														className="py-2 border-b last:border-0 border-romantic-secondary/40"
													>
														{item}
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
