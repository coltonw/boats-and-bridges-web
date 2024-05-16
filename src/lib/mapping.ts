let scale: number = 200;
let size: 'large' | 'medium' | 'small' | 'tiny' = 'large';
let offsetX: number = 0;
let offsetY: number = 0;
const maxScale: number = 200;
const marginMap = {
	large: 22,
	medium: 15,
	small: 11,
	tiny: 6
};
const islandSizeMap = {
	large: 68,
	medium: 45,
	small: 35,
	tiny: 20
};
const margin = () => marginMap[size];
const islandSize = () => islandSizeMap[size];
const clickBuffer = 6;

export const setScale = (level: LevelData, containerWidth: number, containerHeight: number) => {
	let maxX = 0;
	let maxY = 0;
	level.islands.forEach((island) => {
		maxX = Math.max(island.x, maxX);
		maxY = Math.max(island.y, maxY);
	});
	level.boats.forEach(({ boat, dock }) => {
		maxX = Math.max(boat.x + 0.5, maxX);
		maxY = Math.max(boat.y + 0.5, maxY);
		maxX = Math.max(dock.x + 0.5, maxX);
		maxY = Math.max(dock.y + 0.5, maxY);
	});
	level.pirates.forEach((pirate) => {
		maxX = Math.max(pirate.x + 0.5, maxX);
		maxY = Math.max(pirate.y + 0.5, maxY);
	});
	size = 'large';
	if (Math.min(containerWidth / maxX, containerHeight / maxY) < 80) {
		size = 'tiny';
	} else if (Math.min(containerWidth / maxX, containerHeight / maxY) < 130) {
		size = 'small';
	} else if (Math.min(containerWidth / maxX, containerHeight / maxY) < 170) {
		size = 'medium';
	}
	const maxWidth = containerWidth - 2 * margin() - islandSize();
	const maxHeight = containerHeight - 2 * margin() - islandSize();
	scale = Math.min(Math.min(Math.floor(maxWidth / maxX), Math.floor(maxHeight / maxY)), maxScale);
	offsetX = (maxWidth - maxX * scale) / 2;
	// Because of the title, just using the middle of the level area makes the level look too far down the page.
	// Dividing by 3 seems to be the right balance.
	offsetY = (maxHeight - maxY * scale) / 3;
	return {
		// a key used to determine when a re-render needs to happen
		key: scale * 1000000 + offsetX * 1000 + offsetY,
		size
	};
};

export const coordToPx = (coord: number) => coord * scale;
export const xCoordToPx = (coord: number) => coordToPx(coord) + offsetX;
export const yCoordToPx = (coord: number) => coordToPx(coord) + offsetY;
export const coordToCss = (coord: number) => `${coordToPx(coord)}px`;
export const xCoordToCss = (coord: number, modifier: number = 0) =>
	`${xCoordToPx(coord) + modifier}px`;
export const yCoordToCss = (coord: number, modifier: number = 0) =>
	`${yCoordToPx(coord) + modifier}px`;

export const pxToCoord = (px: number, offset: number) => {
	const lowerCoord = Math.floor((px + clickBuffer - margin() - offset) / scale);
	const upperCoord = Math.ceil((px - islandSize() - clickBuffer - margin() - offset) / scale);
	if (lowerCoord === upperCoord) {
		return lowerCoord;
	}
	return undefined;
};
export const xPxToCoord = (px: number) => pxToCoord(px, offsetX);
export const yPxToCoord = (px: number) => pxToCoord(px, offsetY);

export const bridgeZone = (
	startingIsland: Island,
	targetIsland: Island,
	xPx: number,
	yPx: number
): boolean => {
	if (xPxToCoord(xPx) === startingIsland.x && yPxToCoord(yPx) === startingIsland.y) {
		return false;
	}

	const lowerXCoord = Math.floor((xPx + clickBuffer - margin() - offsetX) / scale);
	const upperXCoord = Math.ceil((xPx - islandSize() - clickBuffer - margin() - offsetX) / scale);
	const lowerYCoord = Math.floor((yPx + clickBuffer - margin() - offsetY) / scale);
	const upperYCoord = Math.ceil((yPx - islandSize() - clickBuffer - margin() - offsetY) / scale);
	const minX = Math.min(startingIsland.x, targetIsland.x);
	const maxX = Math.max(startingIsland.x, targetIsland.x);
	const minY = Math.min(startingIsland.y, targetIsland.y);
	const maxY = Math.max(startingIsland.y, targetIsland.y);
	return minX <= lowerXCoord && upperXCoord <= maxX && minY <= lowerYCoord && upperYCoord <= maxY;
};

export const islandCenterOffsetX = () => margin() + Math.floor(islandSize() / 2);
const extraYOffset = {
	large: -4,
	medium: -3,
	small: -2,
	tiny: -1
};
export const islandCenterOffsetY = () =>
	margin() + Math.floor(islandSize() / 2) + extraYOffset[size];
