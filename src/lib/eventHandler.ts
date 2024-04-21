import type { Redirect_1 } from '@sveltejs/kit';
import { pxToCoord } from './mapping';

export const eventHandlerBuilder = (level: LevelData) => (event: MouseEvent) => {
	let offsetX = event.offsetX;
	let offsetY = event.offsetY;

	let element = event.target as HTMLElement;

	while (element && element !== event.currentTarget) {
		offsetX += element.offsetLeft || 0;
		offsetY += element.offsetTop;
		element = element.parentNode as HTMLElement;
	}
	const x = pxToCoord(offsetX);
	const y = pxToCoord(offsetY);
	console.log(`offsetX: ${offsetX}, offsetY: ${offsetY}`);
	console.log(`x: ${x}, y: ${y}`);
	if (typeof x !== 'undefined' && typeof y !== 'undefined') {
		const island = level.islands.find((island) => island.x === x && island.y === y);
		console.log(island);
		if (island) {
			island.n = 1;
		}
	}
};
