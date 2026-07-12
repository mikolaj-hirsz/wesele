import type { Guest } from "./types";

type Props = {
	selectedTable: Guest["table"];
	selectedSeat: number;
};

type RectTableConfig = {
	number: number;
	x: number;
	y: number;
	width: number;
	height: number;
	seatCount: number;
};

const VIEW_WIDTH = 340;
const VIEW_HEIGHT = 520;

const RECT_TABLES: RectTableConfig[] = [
	{ number: 2, x: 30, y: 150, width: 70, height: 170, seatCount: 24 },
	{ number: 4, x: 30, y: 345, width: 70, height: 140, seatCount: 20 },
	{ number: 3, x: 240, y: 150, width: 70, height: 180, seatCount: 24 },
	{ number: 5, x: 240, y: 355, width: 70, height: 140, seatCount: 26 },
];

const HEAD_TABLE = {
	x1: 90,
	x2: 250,
	midY: 90,
	rx: 80,
	ry: 40,
	bottomY: 130,
	seatCount: 6,
};

type SeatPosition = { x: number; y: number; seatNumber: number };

function getSideChairYPositions(yTop: number, yBottom: number, count: number) {
	if (count <= 1) return [(yTop + yBottom) / 2];

	const usableTop = yTop + 12;
	const usableBottom = yBottom - 12;
	const step = (usableBottom - usableTop) / (count - 1);

	return Array.from({ length: count }, (_, i) => usableTop + step * i);
}

function getRectSeatPositions(config: RectTableConfig): SeatPosition[] {
	const { x, y, width, height, seatCount } = config;
	const leftCount = Math.ceil(seatCount / 2);
	const rightCount = seatCount - leftCount;

	const leftChairs = getSideChairYPositions(y, y + height, leftCount).map(
		(chairY, i) => ({ x: x - 13, y: chairY, seatNumber: i + 1 }),
	);

	const rightChairs = getSideChairYPositions(y, y + height, rightCount).map(
		(chairY, i) => ({
			x: x + width + 13,
			y: chairY,
			seatNumber: leftCount + i + 1,
		}),
	);

	return [...leftChairs, ...rightChairs];
}

/** Left-to-right along the arc. */
function getArcSeatPositions(count: number): SeatPosition[] {
	const { x1, x2, midY, rx, ry } = HEAD_TABLE;
	const centerX = (x1 + x2) / 2;
	const chairRx = rx + 18;
	const chairRy = ry + 18;

	return Array.from({ length: count }, (_, i) => {
		const angleDeg = 180 - (i * 180) / (count - 1);
		const angleRad = (angleDeg * Math.PI) / 180;

		return {
			x: centerX + chairRx * Math.cos(angleRad),
			y: midY - chairRy * Math.sin(angleRad),
			seatNumber: i + 1,
		};
	});
}

function Chair({
	x,
	y,
	seatNumber,
	isTableActive,
	isSelectedSeat,
}: {
	x: number;
	y: number;
	seatNumber: number;
	isTableActive: boolean;
	isSelectedSeat: boolean;
}) {
	if (isSelectedSeat) {
		return (
			<g style={{ transformBox: "fill-box", transformOrigin: "center" }}>
				<circle
					cx={x}
					cy={y}
					r={11}
					className="fill-none stroke-romantic-primary seat-chair-pulse"
					strokeWidth={2}
				/>
				<circle
					cx={x}
					cy={y}
					r={8.5}
					className="fill-romantic-primary seat-chair-pop"
					style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.25))" }}
				/>
				<text
					x={x}
					y={y + 3}
					textAnchor="middle"
					className="fill-white seat-chair-pop"
					style={{ fontSize: 9, fontWeight: 700 }}
				>
					{seatNumber}
				</text>
			</g>
		);
	}

	return (
		<circle
			cx={x}
			cy={y}
			r={isTableActive ? 3.6 : 3}
			className={`transition-all duration-300 ${
				isTableActive ? "fill-romantic-primary/55" : "fill-romantic-primary/25"
			}`}
		/>
	);
}

function RectTable({
	config,
	selected,
	selectedSeatNumber,
}: {
	config: RectTableConfig;
	selected: boolean;
	selectedSeatNumber: number | null;
}) {
	const { number, x, y, width, height } = config;
	const centerX = x + width / 2;
	const centerY = y + height / 2;
	const chairs = getRectSeatPositions(config);

	return (
		<g>
			{chairs.map((chair) => (
				<Chair
					key={chair.seatNumber}
					x={chair.x}
					y={chair.y}
					seatNumber={chair.seatNumber}
					isTableActive={selected}
					isSelectedSeat={selected && chair.seatNumber === selectedSeatNumber}
				/>
			))}

			{selected && (
				<rect
					x={x - 8}
					y={y - 8}
					width={width + 16}
					height={height + 16}
					rx={20}
					className="fill-none stroke-romantic-primary table-pulse"
					strokeWidth={2}
				/>
			)}

			<g
				className={`transition-transform duration-500 ${selected ? "scale-105" : ""}`}
				style={{ transformBox: "fill-box", transformOrigin: "center" }}
			>
				<rect
					x={x}
					y={y}
					width={width}
					height={height}
					rx={18}
					strokeWidth={selected ? 2 : 1.2}
					className={`transition-all duration-300 ${
						selected
							? "fill-romantic-primary/15 stroke-romantic-primary drop-shadow-lg"
							: "fill-romantic-surface stroke-romantic-secondary"
					}`}
				/>

				<text
					x={centerX}
					y={centerY - 18}
					textAnchor="middle"
					className="fill-muted"
					style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase" }}
				>
					Stół
				</text>

				<text
					x={centerX}
					y={centerY + 12}
					textAnchor="middle"
					className="fill-romantic-primary font-heading"
					style={{ fontSize: 30 }}
				>
					{number}
				</text>
			</g>
		</g>
	);
}

function HeadTable({
	selected,
	selectedSeatNumber,
}: {
	selected: boolean;
	selectedSeatNumber: number | null;
}) {
	const { x1, x2, midY, rx, ry, bottomY, seatCount } = HEAD_TABLE;
	const centerX = (x1 + x2) / 2;
	const path = `M ${x1} ${midY} A ${rx} ${ry} 0 0 1 ${x2} ${midY} L ${x2} ${bottomY} L ${x1} ${bottomY} Z`;
	const chairs = getArcSeatPositions(seatCount);

	return (
		<g>
			{chairs.map((chair) => (
				<Chair
					key={chair.seatNumber}
					x={chair.x}
					y={chair.y}
					seatNumber={chair.seatNumber}
					isTableActive={selected}
					isSelectedSeat={selected && chair.seatNumber === selectedSeatNumber}
				/>
			))}

			{selected && (
				<path
					d={`M ${x1 - 8} ${midY} A ${rx + 8} ${ry + 8} 0 0 1 ${x2 + 8} ${midY} L ${x2 + 8} ${bottomY + 8} L ${x1 - 8} ${bottomY + 8} Z`}
					className="fill-none stroke-romantic-primary table-pulse"
					strokeWidth={2}
				/>
			)}

			<g
				className={`transition-transform duration-500 ${selected ? "scale-105" : ""}`}
				style={{ transformBox: "fill-box", transformOrigin: "center" }}
			>
				<path
					d={path}
					strokeWidth={selected ? 2 : 1.2}
					className={`transition-all duration-300 ${
						selected
							? "fill-romantic-primary/15 stroke-romantic-primary drop-shadow-lg"
							: "fill-romantic-surface stroke-romantic-secondary"
					}`}
				/>

				<text
					x={centerX}
					y={midY - 2}
					textAnchor="middle"
					className="fill-muted"
					style={{
						fontSize: 7.5,
						letterSpacing: 1.5,
						textTransform: "uppercase",
					}}
				>
					Para Młoda i Świadkowie
				</text>

				<text
					x={centerX}
					y={midY + 22}
					textAnchor="middle"
					className="fill-romantic-primary font-heading"
					style={{ fontSize: 22 }}
				>
					Stół 1
				</text>
			</g>
		</g>
	);
}

export default function TableMap({ selectedTable, selectedSeat }: Props) {
	return (
		<div className="card-romantic">
			<style>{`
				@keyframes tableMapPulseRing {
					0% { opacity: 0.6; transform: scale(1); }
					70% { opacity: 0; transform: scale(1.12); }
					100% { opacity: 0; transform: scale(1.12); }
				}
				@keyframes seatChairPulseRing {
					0% { opacity: 0.8; transform: scale(0.9); }
					70% { opacity: 0; transform: scale(1.6); }
					100% { opacity: 0; transform: scale(1.6); }
				}
				@keyframes seatChairPopIn {
					0% { opacity: 0; transform: scale(0.4); }
					70% { opacity: 1; transform: scale(1.15); }
					100% { opacity: 1; transform: scale(1); }
				}
				.table-pulse {
					animation: tableMapPulseRing 2s ease-out infinite;
					transform-box: fill-box;
					transform-origin: center;
				}
				.seat-chair-pulse {
					animation: seatChairPulseRing 1.8s ease-out infinite;
					transform-box: fill-box;
					transform-origin: center;
				}
				.seat-chair-pop {
					animation: seatChairPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s both;
					transform-box: fill-box;
					transform-origin: center;
				}
			`}</style>

			<svg
				viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
				className="w-full h-auto max-w-md mx-auto"
			>
				<path
					d="M 30 175 L 30 105 Q 30 25 110 25 L 230 25 Q 310 25 310 105 L 310 175"
					className="fill-none stroke-romantic-secondary/40"
					strokeWidth={1.5}
					strokeDasharray="4 6"
				/>

				<HeadTable
					selected={selectedTable === 1}
					selectedSeatNumber={selectedTable === 1 ? selectedSeat : null}
				/>

				{RECT_TABLES.map((table) => (
					<RectTable
						key={table.number}
						config={table}
						selected={selectedTable === table.number}
						selectedSeatNumber={
							selectedTable === table.number ? selectedSeat : null
						}
					/>
				))}

				<text
					x={170}
					y={512}
					textAnchor="middle"
					className="fill-muted"
					style={{ fontSize: 8, letterSpacing: 3, textTransform: "uppercase" }}
				>
					Wejście
				</text>
			</svg>

			<div className="mt-6 flex flex-col items-center">
				<div className="w-24 h-px bg-romantic-primary/20 mb-4" />

				<div className="flex items-center gap-2 text-xs text-muted">
					<span className="w-3 h-3 rounded-full bg-romantic-primary" />
					Twoje miejsce — stół {selectedTable}, miejsce {selectedSeat}
				</div>

				<p className="text-xs text-muted text-center mt-2">
					Ciemniejsze krzesła przy stole oznaczają Twój stół,
					<br />
					wyróżnione krzesło z numerem to dokładnie Twoje miejsce.
				</p>
			</div>
		</div>
	);
}
