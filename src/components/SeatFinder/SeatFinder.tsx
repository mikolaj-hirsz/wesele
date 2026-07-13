import { useEffect, useMemo, useRef, useState } from "react";
import { Armchair, Search, SearchX, X } from "lucide-react";

import TableMap from "./TableMap";
import { guests } from "./guests";
import { getHighlightSegments, normalizeText } from "./searchUtils";
import type { Guest } from "./types";

function HighlightedName({ text, query }: { text: string; query: string }) {
	const segments = getHighlightSegments(text, query);

	return (
		<>
			{segments.map((segment, i) =>
				segment.matched ? (
					<span key={i} className="text-romantic-primary font-semibold">
						{segment.text}
					</span>
				) : (
					<span key={i}>{segment.text}</span>
				),
			)}
		</>
	);
}

export default function SeatFinder() {
	const [query, setQuery] = useState("");
	const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);

	const inputRef = useRef<HTMLInputElement>(null);
	const resultRef = useRef<HTMLDivElement>(null);

	const filteredGuests = useMemo(() => {
		if (!query.trim()) return [];

		const normalizedQuery = normalizeText(query.trim());

		return guests
			.filter((guest) =>
				normalizeText(`${guest.firstName} ${guest.lastName}`).includes(
					normalizedQuery,
				),
			)
			.slice(0, 8);
	}, [query]);

	const isDropdownOpen = isFocused && !!filteredGuests.length && !selectedGuest;

	useEffect(() => {
		if (selectedGuest) {
			resultRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [selectedGuest]);

	const handleSelect = (guest: Guest) => {
		setSelectedGuest(guest);
		setQuery(`${guest.firstName} ${guest.lastName}`);
		// Actually blur the input instead of just setting isFocused(false).
		// The dropdown button's onMouseDown already calls preventDefault so the
		// click can register, which means the input never naturally loses focus
		// here. Forcing a real blur keeps React state and DOM focus in sync,
		// so the next onFocus event fires correctly and the dropdown works again.
		inputRef.current?.blur();
	};

	const handleClear = () => {
		setQuery("");
		setSelectedGuest(null);
		setHighlightedIndex(-1);
		inputRef.current?.focus();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!isDropdownOpen) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setHighlightedIndex((prev) =>
				Math.min(prev + 1, filteredGuests.length - 1),
			);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlightedIndex((prev) => Math.max(prev - 1, 0));
		} else if (e.key === "Enter" && highlightedIndex >= 0) {
			e.preventDefault();
			handleSelect(filteredGuests[highlightedIndex]);
		} else if (e.key === "Escape") {
			inputRef.current?.blur();
		}
	};

	return (
		<section id="seats" className="px-4 mt-12 scroll-mt-20">
			<style>{`
				@keyframes seatFadeInUp {
					from { opacity: 0; transform: translateY(14px); }
					to { opacity: 1; transform: translateY(0); }
				}
				@keyframes seatBadgePopIn {
					0% { opacity: 0; transform: scale(0.6); }
					70% { opacity: 1; transform: scale(1.08); }
					100% { opacity: 1; transform: scale(1); }
				}
				.seat-reveal-card { animation: seatFadeInUp 0.5s ease-out both; }
				.seat-reveal-map { animation: seatFadeInUp 0.6s ease-out 0.15s both; }
				.seat-reveal-badge-1 { animation: seatBadgePopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s both; }
				.seat-reveal-badge-2 { animation: seatBadgePopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both; }
			`}</style>

			<div className="max-w-3xl mx-auto">
				<h2 className="text-xl font-heading text-romantic-primary mb-4">
					Znajdź swoje miejsce
				</h2>

				<p className="text-sm text-muted mb-5">
					Wpisz swoje imię lub nazwisko, aby odnaleźć swoje miejsce przy stole.
				</p>

				{/* SEARCH */}

				<div className="relative">
					<Search
						size={18}
						className="absolute left-4 top-1/2 -translate-y-1/2 text-romantic-primary pointer-events-none"
					/>

					<input
						ref={inputRef}
						autoComplete="off"
						role="combobox"
						aria-expanded={isDropdownOpen}
						aria-controls="guest-listbox"
						value={query}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						onKeyDown={handleKeyDown}
						onChange={(e) => {
							setQuery(e.target.value);
							setSelectedGuest(null);
							setHighlightedIndex(-1);
						}}
						placeholder="Zacznij wpisywać imię lub nazwisko..."
						className="
							w-full
							rounded-2xl
							bg-romantic-surface
							border
							border-romantic-secondary
							pl-12
							pr-11
							py-4
							outline-none
							transition-all
							duration-300
							focus:border-romantic-primary
							focus:ring-2
							focus:ring-romantic-primary/20
						"
					/>

					{!!query && (
						<button
							type="button"
							aria-label="Wyczyść wyszukiwanie"
							onMouseDown={(e) => e.preventDefault()}
							onClick={handleClear}
							className="
								absolute
								right-4
								top-1/2
								-translate-y-1/2
								text-muted
								hover:text-romantic-primary
								transition-colors
							"
						>
							<X size={18} />
						</button>
					)}

					{isDropdownOpen && (
						<div
							id="guest-listbox"
							role="listbox"
							onMouseDown={(e) => e.preventDefault()}
							className="
								absolute
								left-0
								right-0
								mt-2
								overflow-hidden
								rounded-2xl
								bg-romantic-surface
								border
								border-romantic-secondary
								shadow-lg
								z-20
							"
						>
							{filteredGuests.map((guest, i) => (
								<button
									key={`${guest.firstName}-${guest.lastName}`}
									role="option"
									aria-selected={i === highlightedIndex}
									onClick={() => handleSelect(guest)}
									onMouseEnter={() => setHighlightedIndex(i)}
									className={`
										w-full
										text-left
										px-4
										py-3
										border-b
										last:border-0
										border-romantic-secondary/40
										transition-colors
										flex
										items-center
										justify-between
										gap-3
										${i === highlightedIndex ? "bg-romantic-secondary/20" : "hover:bg-romantic-secondary/20"}
									`}
								>
									<span className="flex items-center gap-3">
										<div className="w-8 h-8 shrink-0 rounded-full bg-romantic-primary/10 flex items-center justify-center">
											<Armchair size={15} className="text-romantic-primary" />
										</div>

										<span>
											<HighlightedName text={guest.firstName} query={query} />{" "}
											<HighlightedName text={guest.lastName} query={query} />
										</span>
									</span>

									<span className="text-xs text-muted shrink-0">
										Stół {guest.table}
									</span>
								</button>
							))}
						</div>
					)}
				</div>

				{/* NO RESULT */}

				{query.trim() && !filteredGuests.length && !selectedGuest && (
					<div className="card-romantic mt-5 text-center">
						<div className="flex justify-center mb-3">
							<SearchX size={22} className="text-romantic-primary" />
						</div>

						<p className="font-medium text-romantic-primary">
							Nie znaleziono Gościa
						</p>

						<p className="text-sm text-muted mt-2">
							Sprawdź poprawność wpisanego imienia lub nazwiska.
						</p>
					</div>
				)}

				{/* RESULT */}

				{selectedGuest && (
					<div ref={resultRef} className="scroll-mt-20">
						<div className="card-romantic seat-reveal-card mt-6 text-center">
							<div className="flex justify-center">
								<div
									className="
									w-16
									h-16
									rounded-full
									bg-romantic-primary/10
									flex
									items-center
									justify-center
								"
								>
									<Armchair size={30} className="text-romantic-primary" />
								</div>
							</div>

							<h3 className="font-heading text-2xl mt-5">
								{selectedGuest.firstName} {selectedGuest.lastName}
							</h3>

							<div className="w-16 h-px bg-romantic-primary/30 mx-auto my-5" />

							<p className="uppercase tracking-[0.25em] text-xs text-muted">
								Twoje miejsce
							</p>

							<div className="mt-4 flex items-center justify-center gap-4">
								<div className="seat-reveal-badge-1 flex flex-col items-center">
									<div className="w-20 h-20 rounded-full bg-romantic-primary text-white flex flex-col items-center justify-center shadow-lg">
										<div className="text-[10px] tracking-[0.2em] uppercase opacity-80">
											Stół
										</div>
										<div className="text-3xl font-heading leading-none mt-1">
											{selectedGuest.table}
										</div>
									</div>
								</div>

								<div className="text-romantic-primary/40 text-xl font-heading">
									&
								</div>

								<div className="seat-reveal-badge-2 flex flex-col items-center">
									<div className="w-20 h-20 rounded-full bg-romantic-surface border-2 border-romantic-primary text-romantic-primary flex flex-col items-center justify-center shadow-lg">
										<div className="text-[10px] tracking-[0.2em] uppercase opacity-70">
											Miejsce
										</div>
										<div className="text-3xl font-heading leading-none mt-1">
											{selectedGuest.seat}
										</div>
									</div>
								</div>
							</div>

							<p className="text-sm text-muted mt-6">
								Do zobaczenia na weselu! ❤️
							</p>

							<img
								src="/ornament.svg"
								alt=""
								aria-hidden
								className="w-28 mx-auto mt-6 opacity-20"
							/>
						</div>

						{/* MAP */}

						<div className="seat-reveal-map mt-8">
							<TableMap
								selectedTable={selectedGuest.table}
								selectedSeat={selectedGuest.seat}
							/>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
