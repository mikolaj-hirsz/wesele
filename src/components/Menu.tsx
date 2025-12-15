export default function Menu() {
  return (
    <section id="menu" className="px-4 mt-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-heading text-romantic-primary mb-4">
          Menu
        </h2>

        <div className="card-romantic text-center space-y-3">
          <div className="text-3xl" aria-hidden>
            🍽️
          </div>

          <p className="font-medium">
            Menu w przygotowaniu
          </p>

          <p className="text-muted text-sm">
            Szczegóły dotyczące dań zostaną udostępnione po nowym roku.
          </p>
        </div>
      </div>
    </section>
  );
}
