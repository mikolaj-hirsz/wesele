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
];

export default function Schedule() {
  return (
    <div className="space-y-4">
      {/* ITEMS */}
      {ITEMS.map(item => (
        <div
          key={item.title}
          className={`
            rounded-2xl p-5
            ${
              item.highlight
                ? "bg-romantic-secondary/40 border border-romantic-primary"
                : "bg-romantic-surface shadow-sm"
            }
          `}
        >
          {/* HEADER */}
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

      {/* TBA INFO */}
      <div className="rounded-2xl p-5 bg-romantic-surface shadow-sm text-center">
        <div className="text-romantic-primary text-lg mb-1">
          ✨ Harmonogram w przygotowaniu
        </div>
        <p className="text-sm text-muted">
          Szczegóły dotyczące dalszego przebiegu dnia
          zostaną uzupełnione wkrótce.
        </p>
      </div>
    </div>
  );
}
