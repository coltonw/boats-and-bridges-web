let scale: number = 200;
const maxScale: number = 150;
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
	console.log(Math.floor(maxWidth / maxX), Math.floor(maxHeight / maxY), scale);
	return scale;
};
export const coordToPx = (coord: number, modifier: number = 0) => `${coord * scale + modifier}px`;

export const pxToCoord = (px: number) => {
	const lowerCoord = Math.floor((px + clickBuffer - margin) / scale);
	const upperCoord = Math.ceil((px - islandSize - clickBuffer - margin) / scale);
	if (lowerCoord === upperCoord) {
		return lowerCoord;
	}
	return undefined;
};
