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
    <section
      id="hero"
      className="
        relative overflow-hidden
        flex items-center justify-center
        px-4 py-24
        bg-romantic-bg
      "
    >
      {/* ORNAMENT TOP */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
        <Ornament />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-3xl">
        <p className="tracking-widest text-xs uppercase text-romantic-muted mb-4">
          Pobieramy się
        </p>

        <h1 className="font-heading text-romantic-text text-4xl sm:text-5xl mb-4">
          Wiktoria <span className="text-romantic-primary">&</span> Mikołaj
        </h1>

        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-10 bg-romantic-primary/40" />
          <span className="text-romantic-muted text-sm">
            {dateStr}
          </span>
          <span className="h-px w-10 bg-romantic-primary/40" />
        </div>

        <p className="text-romantic-muted mb-8">
          Folwark Dajak • Koleczkowo
        </p>

        <a
          href="#location"
          className="
            inline-block
            px-8 py-3
            rounded-full
            bg-romantic-primary
            text-white
            shadow
            transition
            hover:scale-[1.02]
          "
        >
          Zobacz miejsce
        </a>
      </div>

      {/* ORNAMENT BOTTOM */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rotate-180 opacity-20 pointer-events-none">
        <Ornament />
      </div>
    </section>
  );
}

/* === ORNAMENT SVG === */

function Ornament() {
  return (
    <svg
      width="320"
      height="80"
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-romantic-primary"
    >
      <path
        d="M10 40 C 60 10, 120 10, 160 40 C 200 70, 260 70, 310 40"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="160" cy="40" r="3" fill="currentColor" />
    </svg>
  );
}
