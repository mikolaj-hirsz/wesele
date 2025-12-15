type ScheduleItem = {
  time: string;
  title: string;
  place?: string;
  highlight?: boolean;
};

const ITEMS: ScheduleItem[] = [
  {
    time: "15:00",
    title: "Ceremonia ślubna",
    place: "Kaplica na terenie Folwarku",
    highlight: true,
  },
  {
    time: "16:30",
    title: "Przyjęcie weselne",
    place: "Folwark Dajak",
  },
  {
    time: "24:00",
    title: "Tort i oczepiny",
  },
];

export default function Schedule() {
  return (
    <div className="space-y-4">
      {ITEMS.map(item => (
        <div
          key={item.time}
          className={`
            rounded-2xl p-5
            ${item.highlight
              ? "bg-romantic-secondary/40 border border-romantic-primary"
              : "bg-romantic-surface shadow-sm"}
          `}
        >
          {/* TITLE */}
          <div className="flex items-center justify-between mb-2">
            <div className="font-heading text-romantic-text text-lg">
              {item.title}
            </div>
            <div className="text-romantic-primary font-semibold">
              {item.time}
            </div>
          </div>

          {/* PLACE */}
          {item.place && (
            <div className="text-sm text-muted">
              {item.place}
            </div>
          )}

          
        </div>
      ))}
    </div>
  );
}
