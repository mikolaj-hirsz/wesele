import { useState } from "react";
import {
	CakeSlice,
	ChevronDown,
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
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

	const toggleSection = (title: string) => {
		setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
	};

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

					{/* ACCESSIBLE DISCLOSURE SECTIONS */}
					<div className="space-y-3">
						{sections.map((section) => {
							const Icon = section.icon;
							const isOpen = !!openSections[section.title];
							const contentId = `menu-section-${section.title}`;

							return (
								<div
									key={section.title}
									className="
										rounded-2xl
										border
										border-romantic-secondary
										bg-romantic-surface
										overflow-hidden
										transition-all
										duration-300
										hover:border-romantic-primary/40
										hover:shadow-md
									"
								>
									<button
										type="button"
										onClick={() => toggleSection(section.title)}
										aria-expanded={isOpen}
										aria-controls={contentId}
										className="
											focus-ring
											w-full
											flex
											items-center
											justify-between
											gap-3
											px-5
											py-4
											font-heading
											text-romantic-text
										"
									>
										<span className="flex items-center gap-3">
											<div className="w-9 h-9 rounded-full bg-romantic-primary/10 flex items-center justify-center">
												<Icon size={18} className="text-romantic-primary" />
											</div>
											<span>{section.title}</span>
										</span>

										<ChevronDown
											size={18}
											className={`text-romantic-primary transition-transform duration-300 ${
												isOpen ? "rotate-180" : ""
											}`}
										/>
									</button>

									{/* grid-rows [0fr]→[1fr] animates height without measuring it in JS */}
									<div
										id={contentId}
										role="region"
										aria-hidden={!isOpen}
										className={`grid transition-all duration-300 ease-out ${
											isOpen
												? "grid-rows-[1fr] opacity-100"
												: "grid-rows-[0fr] opacity-0"
										}`}
									>
										<div className="overflow-hidden">
											<div className="px-5 pb-4 pt-2 border-t border-romantic-secondary/40">
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
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
