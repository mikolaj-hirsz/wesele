export default function Location() {
  return (
    <section id="location" className="px-4 mt-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-heading text-romantic-primary mb-3">
          Miejsce
        </h2>

        <div className="card-romantic">
          <p className="font-medium">Folwark Dajak</p>
          <p className="text-muted">
            ul. Przykładowa 12, 00-001 Miejscowość
          </p>

          <a
            href="https://maps.google.com/?q=Folwark+Dajak"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-romantic-primary underline"
          >
            Otwórz w Google Maps
          </a>

          <p className="text-muted mt-3">
            Parking dostępny na terenie obiektu.
          </p>
        </div>
      </div>
    </section>
  );
}
