interface Props {
  weddingDate: Date;
}

export default function Hero({ weddingDate }: Props) {
  const dateStr = weddingDate.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section id="hero" className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-heading text-romantic-text mb-2">
          Wiktoria & Mikołaj
        </h1>
        <p className="text-muted mb-6">
          {dateStr} • Folwark Dajak
        </p>

        <a
          href="#location"
          className="inline-block px-6 py-3 rounded-full bg-romantic-primary text-white shadow"
        >
          Informacje o miejscu
        </a>
      </div>
    </section>
  );
}
