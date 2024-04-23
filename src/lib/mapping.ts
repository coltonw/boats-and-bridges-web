let scale: number = 200;
let offsetX: number = 0;
const maxScale: number = 200;
export const margin = 12;
export const islandSize = 36;
const clickBuffer = 4;

export const setScale = (level: LevelData, containerWidth: number, containerHeight: number) => {
	let maxX = 0;
	let maxY = 0;
	level.islands.forEach((island) => {
		maxX = Math.max(island.x, maxX);
		maxY = Math.max(island.y, maxY);
	});
	const maxWidth = containerWidth - 2 * margin - islandSize;
	const maxHeight = containerHeight - 2 * margin - islandSize;
	scale = Math.min(Math.min(Math.floor(maxWidth / maxX), Math.floor(maxHeight / maxY)), maxScale);
	console.log(maxX, maxY, Math.floor(maxWidth / maxX), Math.floor(maxHeight / maxY), scale);
	offsetX = (maxWidth - maxX * scale) / 2;
	// return a key used to determine when a re-render needs to happen
	return scale * 1000 + offsetX;
};
export const coordToPx = (coord: number, modifier: number = 0, includeOffsetX: boolean = false) =>
	`${coord * scale + modifier + (includeOffsetX ? offsetX : 0)}px`;

export const pxToCoord = (px: number, includeOffsetX: boolean = false) => {
	const offset = includeOffsetX ? offsetX : 0;
	const lowerCoord = Math.floor((px + clickBuffer - margin - offset) / scale);
	const upperCoord = Math.ceil((px - islandSize - clickBuffer - margin - offset) / scale);
	if (lowerCoord === upperCoord) {
		return lowerCoord;
	}
	return undefined;
};
