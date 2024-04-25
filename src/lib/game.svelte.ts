import { coordToOffset, islandCenterOffsetX, islandCenterOffsetY, pxToCoord } from './mapping';
import { addBridge, adjacent } from './utils';

// Hopefully Svelte knows that this is a state change
const updateLevel = (level: LevelData, change: LevelChange) => {
	console.log(change);
	if (change.add?.bridgesH) {
		level.bridgesH = [...level.bridgesH, ...change.add.bridgesH];
	}
	if (change.add?.bridgesV) {
		level.bridgesV = [...level.bridgesV, ...change.add.bridgesV];
	}
	if (change.remove?.bridgesH) {
		level.bridgesH = level.bridgesH.filter(
			(bH) =>
				!change.remove?.bridgesH?.find(
					(rBH) => bH.x0 === rBH.x0 && bH.x1 === rBH.x1 && bH.y === rBH.y
				)
		);
	}
	if (change.remove?.bridgesV) {
		level.bridgesV = level.bridgesV.filter(
			(bV) =>
				!change.remove?.bridgesV?.find(
					(rBV) => bV.x === rBV.x && bV.y0 === rBV.y0 && bV.y1 === rBV.y1
				)
		);
	}
	if (change.update?.islands) {
		level.islands = level.islands.map((i) => {
			const foundUpdate = change.update?.islands?.find((uI) => i.x === uI.x && i.y === uI.y);
			if (foundUpdate) {
				return { ...foundUpdate };
			}
			return i;
		});
	}
	if (change.update?.bridgesH) {
		level.bridgesH = level.bridgesH.map((bH) => {
			const foundUpdate = change.update?.bridgesH?.find(
				(uBH) => bH.x0 === uBH.x0 && bH.x1 === uBH.x1 && bH.y === uBH.y
			);
			if (foundUpdate) {
				return { ...foundUpdate };
			}
			return bH;
		});
	}
	if (change.update?.bridgesV) {
		level.bridgesV = level.bridgesV.map((bV) => {
			const foundUpdate = change.update?.bridgesV?.find(
				(uBV) => bV.x === uBV.x && bV.y0 === uBV.y0 && bV.y1 === uBV.y1
			);
			if (foundUpdate) {
				return { ...foundUpdate };
			}
			return bV;
		});
	}
	console.log(level.bridgesH);
};

const selectIsland = (level: LevelData, island: Island) => {
	const prevSelect = level.islands.find((i) => i.selected);
	let change: LevelChange | undefined = undefined;
	if (prevSelect) {
		const newSelect = level.islands.find((i) => i.x === island.x && i.y === island.y);
		if (newSelect && adjacent(level, prevSelect, newSelect)) {
			prevSelect.selected = false;
			change = addBridge(level, prevSelect, newSelect);
		}
	}
	if (change) {
		updateLevel(level, change);
	} else {
		level.islands = level.islands.map((i) => {
			if (i.x === island.x && i.y === island.y) {
				return { ...i, selected: !i.selected };
			} else {
				return { ...i, selected: false };
			}
		});
	}
};

const mouseOffset = (event: MouseEvent) => {
	let offsetX = event.offsetX;
	let offsetY = event.offsetY;

	let element = event.target as HTMLElement;

	while (element && element !== event.currentTarget) {
		offsetX += element.offsetLeft || 0;
		offsetY += element.offsetTop || 0;
		element = element.parentNode as HTMLElement;
	}
	return {
		offsetX,
		offsetY
	};
};

export const gameBuilder = (levelParam: LevelData) => {
	const level: LevelData = $state(JSON.parse(JSON.stringify(levelParam)));
	let floatingBridge: FloatingBridge | undefined = $state();
	let mouseDownIsland: Island | undefined = undefined;
	let mouseUpIsland: Island | undefined = undefined;
	const clickHandler = (event: MouseEvent) => {
		const { offsetX, offsetY } = mouseOffset(event);
		const x = pxToCoord(offsetX, true);
		const y = pxToCoord(offsetY);
		if (typeof x !== 'undefined' && typeof y !== 'undefined') {
			const newSelect = level.islands.find((island) => island.x === x && island.y === y);
			if (event.type === 'mousedown') {
				mouseDownIsland = newSelect;
				mouseUpIsland = undefined;
			} else if (event.type === 'mouseup') {
				mouseUpIsland = newSelect;
			} else if (event.type === 'click') {
				if (
					mouseDownIsland &&
					mouseUpIsland &&
					newSelect &&
					mouseDownIsland.x === mouseUpIsland.x &&
					mouseDownIsland.x === newSelect.x &&
					mouseDownIsland.y === mouseUpIsland.y &&
					mouseDownIsland.y === newSelect.y
				) {
					selectIsland(level, mouseDownIsland);
				} else if (
					mouseDownIsland &&
					mouseUpIsland &&
					newSelect &&
					mouseUpIsland.x === newSelect.x &&
					mouseUpIsland.y === newSelect.y
				) {
					const prevSelect = level.islands.find(
						(island) => island.x === mouseDownIsland?.x && island.y === mouseDownIsland?.y
					);
					if (prevSelect && adjacent(level, prevSelect, newSelect)) {
						console.log(prevSelect.x, newSelect.x);
						const change = addBridge(level, prevSelect, newSelect);
						updateLevel(level, change);
					}
				}
			}
		}
		if (event.type === 'click') {
			mouseUpIsland = undefined;
			mouseDownIsland = undefined;
			floatingBridge = undefined;
		}
	};

	const moveHandler = (event: MouseEvent) => {
		if (!mouseDownIsland) {
			return;
		}
		const { offsetX, offsetY } = mouseOffset(event);
		const left = coordToOffset(mouseDownIsland.x, 0, true) + islandCenterOffsetX();
		const top = coordToOffset(mouseDownIsland.y) + islandCenterOffsetY();
		const adj = offsetX - left;
		const opp = offsetY - top;
		const rotate = adj >= 0 ? Math.atan(opp / adj) : Math.atan(opp / adj) + Math.PI;
		const width = Math.sqrt(Math.pow(adj, 2) + Math.pow(opp, 2));
		floatingBridge = {
			left,
			top,
			width,
			rotate
		};
	};

	const leaveHandler = () => {
		mouseDownIsland = undefined;
		mouseUpIsland = undefined;
		floatingBridge = undefined;
	};

	return {
		get level() {
			return level;
		},
		get floatingBridge() {
			return floatingBridge;
		},
		clickHandler,
		moveHandler,
		leaveHandler
	};
};
