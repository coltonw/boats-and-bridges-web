let scale: number = 200;
let offsetX: number = 0;
const maxScale: number = 200;
const marginMap = {
	large: 22,
	small: 11,
	tiny: 5
};
const islandSizeMap = {
	large: 68,
	small: 35,
	tiny: 15
};
const margin = () => marginMap[size()];
const islandSize = () => islandSizeMap[size()];
const clickBuffer = 6;

const size = () => {
	let size: 'large' | 'small' | 'tiny' = 'small';
	if (scale < 40) {
		size = 'tiny';
	}
	if (scale > 100) {
		size = 'large';
	}
	return size;
};

export const setScale = (level: LevelData, containerWidth: number, containerHeight: number) => {
	let maxX = 0;
	let maxY = 0;
	level.islands.forEach((island) => {
		maxX = Math.max(island.x, maxX);
		maxY = Math.max(island.y, maxY);
	});
	const maxWidth = containerWidth - 2 * margin() - islandSize();
	const maxHeight = containerHeight - 2 * margin() - islandSize();
	scale = Math.min(Math.min(Math.floor(maxWidth / maxX), Math.floor(maxHeight / maxY)), maxScale);
	offsetX = (maxWidth - maxX * scale) / 2;

	return {
		// a key used to determine when a re-render needs to happen
		key: scale * 1000 + offsetX,
		size: size()
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
	small: -2,
	tiny: -1
};
export const islandCenterOffsetY = () =>
	margin() + Math.floor(islandSize() / 2) + extraYOffset[size()];
