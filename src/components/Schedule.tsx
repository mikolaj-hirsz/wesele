type ScheduleItem = {
	time: string;
	title: string;
	place?: string;
	description?: string;
	highlight?: boolean;
};

const ITEMS: ScheduleItem[] = [
	{
		time: "15:00",
		title: "Ceremonia ślubna",
		place: "Kaplica na terenie Folwarku",
		highlight: true,
	},
	{ time: "16:40", title: "Obiad" },
	{
		time: "17:40",
		title: "Pierwszy taniec",
		description: "Rozpoczęcie wspólnej zabawy tanecznej",
	},
	{
		time: "18:30",
		title: "Tort weselny",
		description: "Po torcie zapraszamy na słodki bufet.",
	},
	{
		time: "18:45",
		title: "Wspólne zdjęcia",
		description: "Zdjęcia z Parą Młodą.",
	},
	{ time: "20:00", title: "Zimna kolacja" },
	{ time: "21:00", title: "Kulinarna niespodzianka" },
	{ time: "22:30", title: "Ciepła kolacja" },
	{
		time: "23:30",
		title: "Zdjęcia z zimnymi ogniami",
		description: "Zapraszamy wszystkich Gości przed salę.",
	},
	{ time: "00:00", title: "Oczepiny" },
	{ time: "01:30", title: "Ciepła zupa" },
];

export default function Schedule() {
	return (
		<div className="relative pl-9">
			{/* connecting timeline — anchors every event into one continuous flow of the day */}
			<div className="absolute left-[6px] top-2 bottom-2 w-px bg-romantic-secondary" />

			<div className="space-y-5">
				{ITEMS.map((item) => (
					<div key={item.title} className="relative">
						{/* dot */}
						<span
							className={`
								absolute
								-left-9
								top-5
								w-3.5
								h-3.5
								rounded-full
								border-2
								${
									item.highlight
										? "bg-romantic-primary border-romantic-primary"
										: "bg-romantic-bg border-romantic-secondary"
								}
							`}
						/>

						<div className="space-y-3">
							<div
								className={`
                  rounded-2xl p-5
                  ${
										item.highlight
											? "bg-romantic-secondary/40 border border-romantic-primary"
											: "bg-romantic-surface shadow-sm"
									}
                `}
							>
								<div className="flex items-center justify-between mb-2">
									<div className="font-heading text-romantic-text text-lg">
										{item.title}
									</div>

									<div className="text-romantic-primary font-semibold">
										{item.time}
									</div>
								</div>

								{item.place && (
									<div className="text-sm text-muted">{item.place}</div>
								)}

								{item.description && (
									<div className="text-sm text-muted mt-2">
										{item.description}
									</div>
								)}
							</div>

							{item.highlight && (
								<div className="rounded-xl border border-romantic-secondary bg-romantic-surface px-4 py-3">
									<p className="text-sm text-muted leading-relaxed">
										Ceremonia odbędzie się w{" "}
										<span className="font-medium text-romantic-text">
											Kościele Polskokatolickim
										</span>
										. Wszystkich Gości serdecznie zapraszamy do wspólnego
										uczestnictwa. Osoby planujące dołączyć wyłącznie do
										przyjęcia weselnego zapraszamy od{" "}
										<span className="font-medium text-romantic-text">
											godziny 16:00
										</span>
										.
									</p>
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			<div className="text-center mt-6">
				<p className="text-xs text-muted italic">
					Wszystkie godziny poza ceremonią mają charakter orientacyjny i mogą
					ulec niewielkim zmianom.
				</p>
			</div>
		</div>
	);
}
