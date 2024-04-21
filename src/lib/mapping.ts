let scale: number = 150;
const margin = 12;
const islandWidth = 30;
const clickBuffer = 4;

export const setScale = (s: number) => {
	scale = s;
};
export const coordToPx = (coord: number) => `${coord * scale}px`;

export const pxToCoord = (px: number) => {
	const lowerCoord = Math.floor((px + clickBuffer - margin) / scale);
	const upperCoord = Math.ceil((px - islandWidth - clickBuffer - margin) / scale);
	if (lowerCoord === upperCoord) {
		return lowerCoord;
	}
	return undefined;
};
