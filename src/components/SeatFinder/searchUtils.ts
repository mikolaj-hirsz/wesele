/**
 * Normalizes text for search: lowercase, strips Polish diacritics.
 * Lets "Wisniewski" match "Wiśniewski", "Kowalski" match "Kowalśki", etc.
 */
export function normalizeText(value: string): string {
	return value
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/ł/g, "l");
}

type TextSegment = { text: string; matched: boolean };

/**
 * Splits `text` into segments so the matching part of a search query
 * can be highlighted, while keeping the original (accented) characters.
 */
export function getHighlightSegments(
	text: string,
	query: string,
): TextSegment[] {
	const trimmedQuery = query.trim();
	if (!trimmedQuery) return [{ text, matched: false }];

	const normalizedText = normalizeText(text);
	const normalizedQuery = normalizeText(trimmedQuery);
	const matchIndex = normalizedText.indexOf(normalizedQuery);

	if (matchIndex === -1) return [{ text, matched: false }];

	const segments: TextSegment[] = [
		{ text: text.slice(0, matchIndex), matched: false },
		{
			text: text.slice(matchIndex, matchIndex + normalizedQuery.length),
			matched: true,
		},
		{ text: text.slice(matchIndex + normalizedQuery.length), matched: false },
	];

	return segments.filter((segment) => segment.text.length > 0);
}