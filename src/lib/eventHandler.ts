import { pxToCoord } from './mapping';
import { addBridge, removeBridge, adjacent } from './utils';

const selectIsland = (level: LevelData, island: Island) => {
	const prevSelect = level.islands.find((i) => i.selected);
	if (prevSelect) {
		prevSelect.selected = false;
		const newSelect = level.islands.find((i) => i.x === island.x && i.y === island.y);
		if (newSelect && adjacent(level, prevSelect, newSelect)) {
			addBridge(level, prevSelect, newSelect);
		}
	} else {
		level.islands.forEach((i) => {
			if (i.x === island.x && i.y === island.y) {
				i.selected = !i.selected;
			} else {
				i.selected = false;
			}
		});
	}
};

export const eventHandlerBuilder = (level: LevelData) => {
	let mouseDownIsland: Island | undefined = undefined;
	let mouseUpIsland: Island | undefined = undefined;
	return (event: MouseEvent) => {
		event.type;
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
			if (event.type === 'mousedown') {
				mouseDownIsland = island;
			} else if (event.type === 'mouseup') {
				mouseUpIsland = island;
			} else if (event.type === 'click') {
				if (
					mouseDownIsland &&
					mouseUpIsland &&
					island &&
					mouseDownIsland.x === mouseUpIsland.x &&
					mouseDownIsland.x === island.x &&
					mouseDownIsland.y === mouseUpIsland.y &&
					mouseDownIsland.y === island.y
				) {
					selectIsland(level, mouseDownIsland);
				}
				mouseUpIsland = undefined;
				mouseDownIsland = undefined;
			}
		}
	};
};
