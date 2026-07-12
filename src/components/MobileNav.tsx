import { useState } from "react";

const links = [
  { href: "#countdown", label: "Odliczanie" },
  { href: "#schedule", label: "Harmonogram" },
  { href: "#menu", label: "Menu" },
  { href: "#rsvp", label: "Potwierdzenie" },
  { href: "#location", label: "Miejsce" },
  { href: "#contact", label: "Kontakt" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-romantic-surface/95 backdrop-blur border-b border-romantic-secondary">
      <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
        {/* BRAND */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-romantic-primary/10 flex items-center justify-center text-romantic-primary font-semibold">
            W&M
          </div>
          <span className="font-heading text-romantic-text text-lg tracking-wide">
            Wiktoria & Mikołaj
          </span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden sm:flex items-center gap-5 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="
                relative
                text-romantic-text
                transition-colors
                hover:text-romantic-primary
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-px
                after:w-0
                after:bg-romantic-primary
                after:transition-all
                hover:after:w-full
              "
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden p-2 rounded-md focus:ring ring-romantic-primary/30"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="sm:hidden bg-romantic-surface border-t border-romantic-secondary">
          <div className="px-4 py-6">
            <div className="card-romantic space-y-4">
              {/* SEPARATOR */}
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-romantic-primary/40" />
                <span className="text-romantic-primary text-xs">♥</span>
                <span className="h-px w-8 bg-romantic-primary/40" />
              </div>

              <ul className="flex flex-col divide-y divide-romantic-secondary">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="
                        block
                        py-3
                        text-center
                        text-romantic-text
                        font-medium
                        tracking-wide
                        hover:text-romantic-primary
                      "
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
