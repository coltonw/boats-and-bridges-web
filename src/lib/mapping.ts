let scale: number = 150;
export const margin = 12;
export const islandSize = 36;
const clickBuffer = 4;

export const setScale = (s: number) => {
	scale = s;
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
