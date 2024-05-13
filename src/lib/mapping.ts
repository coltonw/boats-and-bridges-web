let scale: number = 200;
let size: 'large' | 'medium' | 'small' | 'tiny' = 'large';
let offsetX: number = 0;
// TODO: add offsetY
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
	console.log(Math.min(containerWidth / maxX, containerHeight / maxY), size);
	const maxWidth = containerWidth - 2 * margin() - islandSize();
	const maxHeight = containerHeight - 2 * margin() - islandSize();
	scale = Math.min(Math.min(Math.floor(maxWidth / maxX), Math.floor(maxHeight / maxY)), maxScale);
	offsetX = (maxWidth - maxX * scale) / 2;
	return {
		// a key used to determine when a re-render needs to happen
		key: scale * 1000 + offsetX,
		size
	};
};

export const coordToOffset = (
	coord: number,
	modifier: number = 0,
	includeOffsetX: boolean = false
) => coord * scale + modifier + (includeOffsetX ? offsetX : 0);

export const coordToPx = (coord: number, modifier: number = 0, includeOffsetX: boolean = false) =>
	`${coordToOffset(coord, modifier, includeOffsetX)}px`;

export const pxToCoord = (px: number, includeOffsetX: boolean = false) => {
	const offset = includeOffsetX ? offsetX : 0;
	const lowerCoord = Math.floor((px + clickBuffer - margin() - offset) / scale);
	const upperCoord = Math.ceil((px - islandSize() - clickBuffer - margin() - offset) / scale);
	if (lowerCoord === upperCoord) {
		return lowerCoord;
	}
	return undefined;
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
