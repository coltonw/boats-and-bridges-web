import {
	xCoordToPx,
	yCoordToPx,
	islandCenterOffsetX,
	islandCenterOffsetY,
	xPxToCoord,
	yPxToCoord,
	bridgeZone
} from './mapping';
import { saveLevel } from './storage';
import { addBridge, adjacent, bridgeBetween, horAdjacent, vertAdjacent } from './utils';

const inverseChange = (level: LevelData, change: LevelChange): LevelChange => {
	const undoChange: LevelChange = {};
	if (change.add?.bridgesH) {
		undoChange.remove = { ...undoChange.remove };
		undoChange.remove.bridgesH = [...change.add.bridgesH];
	}
	if (change.add?.bridgesV) {
		undoChange.remove = { ...undoChange.remove };
		undoChange.remove.bridgesV = [...change.add.bridgesV];
	}
	if (change.remove?.bridgesH) {
		undoChange.add = { ...undoChange.add };
		undoChange.add.bridgesH = [...change.remove.bridgesH];
	}
	if (change.remove?.bridgesV) {
		undoChange.add = { ...undoChange.add };
		undoChange.add.bridgesV = [...change.remove.bridgesV];
	}
	if (change.update?.islands) {
		undoChange.update = { ...undoChange.update };
		undoChange.update.islands = level.islands.flatMap((i) => {
			const foundUpdate = change.update?.islands?.find((uI) => i.x === uI.x && i.y === uI.y);
			if (foundUpdate) {
				return [i];
			}
			return [];
		});
	}
	if (change.update?.bridgesH) {
		undoChange.update = { ...undoChange.update };
		undoChange.update.bridgesH = level.bridgesH.flatMap((bH) => {
			const foundUpdate = change.update?.bridgesH?.find(
				(uBH) => bH.x0 === uBH.x0 && bH.x1 === uBH.x1 && bH.y === uBH.y
			);
			if (foundUpdate) {
				return [bH];
			}
			return [];
		});
	}
	if (change.update?.bridgesV) {
		undoChange.update = { ...undoChange.update };
		undoChange.update.bridgesV = level.bridgesV.flatMap((bV) => {
			const foundUpdate = change.update?.bridgesV?.find(
				(uBV) => bV.x === uBV.x && bV.y0 === uBV.y0 && bV.y1 === uBV.y1
			);
			if (foundUpdate) {
				return [bV];
			}
			return [];
		});
	}
	return undoChange;
};

// Hopefully Svelte knows that this is a state change
const updateLevel = (level: LevelData, change: LevelChange, skipInverse: boolean = false) => {
	if (!skipInverse) {
		level.undoStack = [...level.undoStack, inverseChange(level, change)];
	}
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
	saveLevel(level);
};

const updateSelection = (level: LevelData, select?: Island) => {
	level.islands = level.islands.map((i) => {
		if (select && i.x === select.x && i.y === select.y) {
			return { ...i, selected: !i.selected };
		} else {
			return { ...i, selected: false };
		}
	});
};

const undo = (level: LevelData) => {
	if (level.undoStack.length > 0) {
		const undoChange = level.undoStack[level.undoStack.length - 1];
		updateLevel(level, undoChange, true);
		level.undoStack = level.undoStack.slice(0, level.undoStack.length - 1);
	}
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
		updateSelection(level, island);
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

const touchOffset = (event: AppTouchEvent) => {
	const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
	if (event.targetTouches.length > 0) {
		const offsetX = event.targetTouches[0].pageX - rect.left;
		const offsetY = event.targetTouches[0].pageY - rect.top;
		return {
			offsetX,
			offsetY
		};
	}
	const offsetX = event.changedTouches[0].pageX - rect.left;
	const offsetY = event.changedTouches[0].pageY - rect.top;
	return {
		offsetX,
		offsetY
	};
};

const checkForBridgeBlueprints = (
	level: LevelData,
	startingIsland: Island,
	xPx: number,
	yPx: number
) => {
	for (let i = 0; i < level.islands.length; i++) {
		if (
			horAdjacent(level, startingIsland, level.islands[i]) &&
			bridgeZone(startingIsland, level.islands[i], xPx, yPx)
		) {
			const b = bridgeBetween(level, startingIsland, level.islands[i]);
			return {
				bridgeH: b
					? { ...(b as BridgeH), n: b.n + 1 }
					: {
							x0: Math.min(startingIsland.x, level.islands[i].x),
							x1: Math.max(startingIsland.x, level.islands[i].x),
							y: startingIsland.y,
							n: 1
						}
			};
		}
		if (
			vertAdjacent(level, startingIsland, level.islands[i]) &&
			bridgeZone(startingIsland, level.islands[i], xPx, yPx)
		) {
			const b = bridgeBetween(level, startingIsland, level.islands[i]);
			return {
				bridgeV: b
					? { ...(b as BridgeV), n: b.n + 1 }
					: {
							x: startingIsland.x,
							y0: Math.min(startingIsland.y, level.islands[i].y),
							y1: Math.max(startingIsland.y, level.islands[i].y),
							n: 1
						}
			};
		}
	}
	return {};
};

export const gameBuilder = (levelParam: LevelData) => {
	const level: LevelData = $state(JSON.parse(JSON.stringify(levelParam)));
	let floatingBridge: FloatingBridge | undefined = $state();
	let bridgeHBlueprint: BridgeH | undefined = $state();
	let bridgeVBlueprint: BridgeV | undefined = $state();
	let destroyBridge: DestroyBridge | undefined = $state();
	let mouseDownIsland: Island | undefined = undefined;
	let mouseUpIsland: Island | undefined = undefined;
	const clickHandler = (event: MouseEvent | AppTouchEvent) => {
		const { offsetX, offsetY } = event.type.includes('touch')
			? touchOffset(event as AppTouchEvent)
			: mouseOffset(event as MouseEvent);
		const x = xPxToCoord(offsetX);
		const y = yPxToCoord(offsetY);
		if (typeof x !== 'undefined' && typeof y !== 'undefined') {
			const newSelect = level.islands.find((island) => island.x === x && island.y === y);
			if (event.type === 'mousedown' || event.type === 'touchstart') {
				mouseDownIsland = newSelect;
				mouseUpIsland = undefined;
			} else if (event.type === 'mouseup' || event.type === 'touchend') {
				mouseUpIsland = newSelect;
			}
			if (
				event.type === 'click' &&
				mouseDownIsland &&
				mouseUpIsland &&
				newSelect &&
				mouseDownIsland.x === mouseUpIsland.x &&
				mouseDownIsland.x === newSelect.x &&
				mouseDownIsland.y === mouseUpIsland.y &&
				mouseDownIsland.y === newSelect.y
			) {
				// click island
				if (event.type === 'click') {
					selectIsland(level, mouseDownIsland);
				}
			}
		}
		if (event.type === 'click' || event.type === 'touchend') {
			if (bridgeHBlueprint) {
				const island0 = level.islands.find(
					(island) => island.x === bridgeHBlueprint?.x0 && island.y === bridgeHBlueprint?.y
				);
				const island1 = level.islands.find(
					(island) => island.x === bridgeHBlueprint?.x1 && island.y === bridgeHBlueprint?.y
				);
				if (island0 && island1) {
					const change = addBridge(level, island0, island1);
					updateLevel(level, change);
					updateSelection(level);
				}
			} else if (bridgeVBlueprint) {
				const island0 = level.islands.find(
					(island) => island.x === bridgeVBlueprint?.x && island.y === bridgeVBlueprint?.y0
				);
				const island1 = level.islands.find(
					(island) => island.x === bridgeVBlueprint?.x && island.y === bridgeVBlueprint?.y1
				);
				if (island0 && island1) {
					const change = addBridge(level, island0, island1);
					updateLevel(level, change);
					updateSelection(level);
				}
			}
			mouseUpIsland = undefined;
			mouseDownIsland = undefined;
			floatingBridge = undefined;
			bridgeHBlueprint = undefined;
			bridgeVBlueprint = undefined;
			destroyBridge = undefined;
		}
	};

	const moveHandler = (event: MouseEvent | AppTouchEvent) => {
		if (!mouseDownIsland) {
			return;
		}
		const { offsetX, offsetY } = event.type.includes('touch')
			? touchOffset(event as AppTouchEvent)
			: mouseOffset(event as MouseEvent);
		const { bridgeH, bridgeV } = checkForBridgeBlueprints(level, mouseDownIsland, offsetX, offsetY);
		if (bridgeH) {
			bridgeHBlueprint = bridgeH;
			if (bridgeH.n < 3) {
				destroyBridge = undefined;
			} else {
				destroyBridge = {
					x: (bridgeH.x0 + bridgeH.x1) / 2,
					y: bridgeH.y
				};
			}
			bridgeVBlueprint = undefined;
			floatingBridge = undefined;
		} else if (bridgeV) {
			bridgeVBlueprint = bridgeV;
			if (bridgeV.n < 3) {
				destroyBridge = undefined;
			} else {
				destroyBridge = {
					x: bridgeV.x,
					y: (bridgeV.y0 + bridgeV.y1) / 2
				};
			}
			bridgeHBlueprint = undefined;
			floatingBridge = undefined;
		} else {
			const left = xCoordToPx(mouseDownIsland.x) + islandCenterOffsetX();
			const top = yCoordToPx(mouseDownIsland.y) + islandCenterOffsetY();
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
			bridgeHBlueprint = undefined;
			bridgeVBlueprint = undefined;
			destroyBridge = undefined;
		}
	};

	const keydownHandler = (event: KeyboardEvent) => {
		if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
			undo(level);
		}
	};

	const undoHandler = () => {
		undo(level);
	};

	const resetHandler = () => {
		if (level.bridgesH.length > 0 || level.bridgesV.length > 0) {
			const change: LevelChange = {
				remove: {
					bridgesH: level.bridgesH,
					bridgesV: level.bridgesV
				},
				update: {
					islands: level.islands.map((island) => ({ ...island, n: 0 }))
				}
			};
			updateLevel(level, change);
		}
	};

	const leaveHandler = () => {
		mouseDownIsland = undefined;
		mouseUpIsland = undefined;
		floatingBridge = undefined;
		bridgeHBlueprint = undefined;
		bridgeVBlueprint = undefined;
		destroyBridge = undefined;
	};

	return {
		get level() {
			return level;
		},
		get floatingBridge() {
			return floatingBridge;
		},
		get bridgeHBlueprint() {
			return bridgeHBlueprint;
		},
		get bridgeVBlueprint() {
			return bridgeVBlueprint;
		},
		get destroyBridge() {
			return destroyBridge;
		},
		clickHandler,
		moveHandler,
		leaveHandler,
		keydownHandler,
		undoHandler,
		resetHandler
	};
};
