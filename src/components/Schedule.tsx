type ScheduleItem = {
  time: string;
  title: string;
  place?: string;
};

const ITEMS: ScheduleItem[] = [
  { time: "15:00", title: "Ceremonia ślubna", place: "Kościół parafialny" },
  { time: "17:00", title: "Przyjęcie weselne", place: "Folwark Dajak" },
  { time: "22:00", title: "Tort i oczepiny" },
];

export default function Schedule() {
  return (
    <div className="space-y-3">
      {ITEMS.map(item => (
        <article key={item.time} className="card-romantic flex gap-4">
          <div className="w-16 font-semibold text-romantic-primary">
            {item.time}
          </div>
          <div>
            <div className="font-medium text-romantic-text">
              {item.title}
            </div>
            {item.place && (
              <div className="text-sm text-muted">
                {item.place}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
