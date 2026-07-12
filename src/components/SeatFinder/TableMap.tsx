import type { Guest } from "./types";

type Props = {
	selectedTable: Guest["table"];
};

type RectTableConfig = {
	number: number;
	x: number;
	y: number;
	width: number;
	height: number;
	leftSeats: number;
	rightSeats: number;
};

const VIEW_WIDTH = 340;
const VIEW_HEIGHT = 520;

const RECT_TABLES: RectTableConfig[] = [
	{
		number: 2,
		x: 30,
		y: 170,
		width: 70,
		height: 160,
		leftSeats: 6,
		rightSeats: 6,
	},
	{
		number: 3,
		x: 30,
		y: 350,
		width: 70,
		height: 130,
		leftSeats: 5,
		rightSeats: 5,
	},
	{
		number: 4,
		x: 240,
		y: 170,
		width: 70,
		height: 170,
		leftSeats: 6,
		rightSeats: 7,
	},
	{
		number: 5,
		x: 240,
		y: 360,
		width: 70,
		height: 130,
		leftSeats: 6,
		rightSeats: 6,
	},
];

const HEAD_TABLE = {
	x1: 90,
	x2: 250,
	midY: 90,
	rx: 80,
	ry: 40,
	bottomY: 130,
};

function getSideChairYPositions(yTop: number, yBottom: number, count: number) {
	if (count <= 1) return [(yTop + yBottom) / 2];

	const usableTop = yTop + 10;
	const usableBottom = yBottom - 10;
	const step = (usableBottom - usableTop) / (count - 1);

	return Array.from({ length: count }, (_, i) => usableTop + step * i);
}

function getArcChairPositions(count: number) {
	const { x1, x2, midY, rx, ry } = HEAD_TABLE;
	const centerX = (x1 + x2) / 2;
	const chairRx = rx + 16;
	const chairRy = ry + 16;

	return Array.from({ length: count }, (_, i) => {
		const angleDeg = 180 - (i * 180) / (count - 1);
		const angleRad = (angleDeg * Math.PI) / 180;

		return {
			x: centerX + chairRx * Math.cos(angleRad),
			y: midY - chairRy * Math.sin(angleRad),
		};
	});
}

function Chair({ x, y, active }: { x: number; y: number; active: boolean }) {
	return (
		<circle
			cx={x}
			cy={y}
			r={active ? 3.8 : 3.2}
			className={
				active
					? "fill-romantic-primary transition-all duration-300"
					: "fill-romantic-primary/30 transition-all duration-300"
			}
		/>
	);
}

function RectTable({
	config,
	selected,
}: {
	config: RectTableConfig;
	selected: boolean;
}) {
	const { number, x, y, width, height, leftSeats, rightSeats } = config;
	const seatCount = leftSeats + rightSeats;
	const centerX = x + width / 2;
	const centerY = y + height / 2;

	const leftChairYs = getSideChairYPositions(y, y + height, leftSeats);
	const rightChairYs = getSideChairYPositions(y, y + height, rightSeats);

	return (
		<g>
			{leftChairYs.map((chairY, i) => (
				<Chair key={`l-${i}`} x={x - 12} y={chairY} active={selected} />
			))}
			{rightChairYs.map((chairY, i) => (
				<Chair key={`r-${i}`} x={x + width + 12} y={chairY} active={selected} />
			))}

			{selected && (
				<rect
					x={x - 8}
					y={y - 8}
					width={width + 16}
					height={height + 16}
					rx={20}
					className="fill-none stroke-romantic-primary pulse-ring"
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

				<text
					x={centerX}
					y={centerY + 30}
					textAnchor="middle"
					className="fill-muted"
					style={{ fontSize: 8 }}
				>
					{seatCount} osób
				</text>
			</g>
		</g>
	);
}

function HeadTable({ selected }: { selected: boolean }) {
	const { x1, x2, midY, rx, ry, bottomY } = HEAD_TABLE;
	const centerX = (x1 + x2) / 2;
	const path = `M ${x1} ${midY} A ${rx} ${ry} 0 0 1 ${x2} ${midY} L ${x2} ${bottomY} L ${x1} ${bottomY} Z`;
	const chairs = getArcChairPositions(6);

	return (
		<g>
			{chairs.map((chair, i) => (
				<Chair key={i} x={chair.x} y={chair.y} active={selected} />
			))}

			{selected && (
				<path
					d={`M ${x1 - 8} ${midY} A ${rx + 8} ${ry + 8} 0 0 1 ${x2 + 8} ${midY} L ${x2 + 8} ${bottomY + 8} L ${x1 - 8} ${bottomY + 8} Z`}
					className="fill-none stroke-romantic-primary pulse-ring"
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

export default function TableMap({ selectedTable }: Props) {
	return (
		<div className="card-romantic">
			<style>{`
				@keyframes tableMapPulseRing {
					0% { opacity: 0.6; transform: scale(1); }
					70% { opacity: 0; transform: scale(1.12); }
					100% { opacity: 0; transform: scale(1.12); }
				}
				.pulse-ring {
					animation: tableMapPulseRing 2s ease-out infinite;
					transform-box: fill-box;
					transform-origin: center;
				}
			`}</style>

			<svg
				viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
				className="w-full h-auto max-w-md mx-auto"
			>
				{/* horseshoe guide line */}
				<path
					d={`M 30 175 L 30 105 Q 30 25 110 25 L 230 25 Q 310 25 310 105 L 310 175`}
					className="fill-none stroke-romantic-secondary/40"
					strokeWidth={1.5}
					strokeDasharray="4 6"
				/>

				{/* dance floor */}
				<rect
					x={110}
					y={165}
					width={120}
					height={330}
					rx={24}
					className="fill-romantic-secondary/10 stroke-romantic-secondary/50"
					strokeWidth={1}
					strokeDasharray="5 5"
				/>
				<text
					x={170}
					y={330}
					textAnchor="middle"
					className="fill-muted"
					style={{
						fontSize: 9,
						letterSpacing: 4,
						textTransform: "uppercase",
					}}
					transform="rotate(90 170 330)"
				>
					Parkiet
				</text>

				<HeadTable selected={selectedTable === 1} />

				{RECT_TABLES.map((table) => (
					<RectTable
						key={table.number}
						config={table}
						selected={selectedTable === table.number}
					/>
				))}

				{/* entrance hint */}
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
					<span className="w-2.5 h-2.5 rounded-full bg-romantic-primary" />
					Twoje miejsce
				</div>

				<p className="text-xs text-muted text-center mt-2">
					Podświetlony został stół, przy którym znajduje się Twoje miejsce.
				</p>
			</div>
		</div>
	);
}
