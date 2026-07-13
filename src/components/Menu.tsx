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

type MenuSection = {
	title: string;
	icon: typeof UtensilsCrossed;
	items: string[];
	subtitle?: string;
	additions?: string[];
	highlight?: boolean;
};

const sections: MenuSection[] = [
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
		items: ["Krem z pomidorów"],
	},
	{
		title: "Dania główne",
		icon: UtensilsCrossed,
		subtitle: "Serwowane w półmiskach",
		items: [
			"Devolay",
			"Polędwiczki wieprzowe w sosie śmietanowo-winnym",
			"Wołowina po burgundzku",
			"Dorsz zapiekany z cytryną i żurawiną",
		],
		additions: [
			"Ziemniaki",
			"Kopytka",
			"Frytki",
			"Warzywa pieczone",
			"Surówki sezonowe",
		],
		highlight: true,
	},
	{
		title: "Desery",
		icon: CakeSlice,
		items: ["Szarlotka z kruszonką", "Sernik tradycyjny", "Miodownik"],
	},
	{
		title: "Bufet",
		icon: Salad,
		items: [
			"Tatar",
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
		items: ["Swojska zupa na wędzonce z kiełbasą i ziemniakami"],
	},
];

export default function Menu() {
	// "Dania główne" starts expanded since it's the section guests check first
	const [openSections, setOpenSections] = useState<Record<string, boolean>>({
		"Dania główne": true,
	});

	const toggleSection = (title: string) => {
		setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
	};

	return (
		<section id="menu" className="px-4 mt-12 scroll-mt-20">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-xl font-heading text-romantic-primary mb-4">
					Menu
				</h2>

				<div className="space-y-3">
					{sections.map((section) => {
						const Icon = section.icon;
						const isOpen = !!openSections[section.title];
						const contentId = `menu-section-${section.title}`;

						return (
							<div
								key={section.title}
								className={`
									rounded-2xl
									border
									bg-romantic-surface
									overflow-hidden
									transition-all
									duration-300
									hover:shadow-md
									${
										section.highlight
											? "border-romantic-primary"
											: "border-romantic-secondary hover:border-romantic-primary/40"
									}
								`}
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
									<span className="flex items-center gap-3 min-w-0">
										<div className="w-9 h-9 shrink-0 rounded-full bg-romantic-primary/10 flex items-center justify-center">
											<Icon size={18} className="text-romantic-primary" />
										</div>
										<span className="text-left min-w-0">
											<span className="block">{section.title}</span>
											{section.subtitle && (
												<span className="block text-xs font-body font-normal text-muted mt-0.5">
													{section.subtitle}
												</span>
											)}
										</span>
									</span>

									<ChevronDown
										size={18}
										className={`shrink-0 text-romantic-primary transition-transform duration-300 ${
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

											{section.additions && (
												<div className="mt-3 pt-3 border-t border-romantic-secondary/40">
													<p className="text-xs text-muted mb-2">Dodatki</p>

													<div className="flex flex-wrap gap-2">
														{section.additions.map((item) => (
															<span
																key={item}
																className="px-2.5 py-1 rounded-full bg-romantic-primary/10 text-xs text-romantic-text"
															>
																{item}
															</span>
														))}
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
