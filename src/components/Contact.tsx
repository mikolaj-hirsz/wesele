export default function Contact() {
  return (
    <section id="contact" className="px-4 mt-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-heading text-romantic-primary mb-3">
          Kontakt
        </h2>

        <div className="card-romantic space-y-2">
          <p>
            <strong>Wiktoria</strong>{" "}
            <a href="tel:+48111111111" className="text-romantic-primary">
              +48 111 111 111
            </a>
          </p>
          <p>
            <strong>Mikołaj</strong>{" "}
            <a href="tel:+48222222222" className="text-romantic-primary">
              +48 222 222 222
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
