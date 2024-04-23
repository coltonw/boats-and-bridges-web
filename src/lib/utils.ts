const bridgesLeft = (island: Island) => (island.b || 8) - island.n;

const vertAdjacent = (level: LevelData, island0: Island, island1: Island) => {
	if (island0.x === island1.x && island0.y !== island1.y) {
		// check if there are any islands in the way
		for (let i = 0; i < level.islands.length; i++) {
			if (
				level.islands[i].x === island0.x &&
				((level.islands[i].y < island0.y && level.islands[i].y > island1.y) ||
					(level.islands[i].y > island0.y && level.islands[i].y < island1.y))
			) {
				return false;
			}
		}
		// check if there are any bridges in the way
		for (let i = 0; i < level.bridgesH.length; i++) {
			if (
				((level.bridgesH[i].y <= island0.y && level.bridgesH[i].y >= island1.y) ||
					(level.bridgesH[i].y >= island0.y && level.bridgesH[i].y <= island1.y)) &&
				level.bridgesH[i].x0 < island0.x &&
				level.bridgesH[i].x1 > island0.x
			) {
				return false;
			}
		}
		// nothing in the way, they must be adjacent
		return true;
	}
	return false;
};

const horAdjacent = (level: LevelData, island0: Island, island1: Island) => {
	if (island0.y === island1.y && island0.x !== island1.x) {
		for (let i = 0; i < level.islands.length; i++) {
			if (
				level.islands[i].y === island0.y &&
				((level.islands[i].x < island0.x && level.islands[i].x > island1.x) ||
					(level.islands[i].x > island0.x && level.islands[i].x < island1.x))
			) {
				return false;
			}
		}
		for (let i = 0; i < level.bridgesV.length; i++) {
			if (
				((level.bridgesV[i].x <= island0.x && level.bridgesV[i].x >= island1.x) ||
					(level.bridgesV[i].x >= island0.x && level.bridgesV[i].x <= island1.x)) &&
				level.bridgesV[i].y0 < island0.y &&
				level.bridgesV[i].y1 > island0.y
			) {
				return false;
			}
		}
		return true;
	}
	return false;
};

export const adjacent = (level: LevelData, island0: Island, island1: Island) => {
	return vertAdjacent(level, island0, island1) || horAdjacent(level, island0, island1);
};

export const full = (island: Island) => bridgesLeft(island) <= 0;

export const addBridge = (level: LevelData, island0: Island, island1: Island, n = 1) => {
	let added = true;
	if (island0.x === island1.x) {
		const bridge = {
			x: island0.x,
			y0: Math.min(island0.y, island1.y),
			y1: Math.max(island0.y, island1.y),
			n
		};
		let found = false;
		for (let i = 0; i < level.bridgesV.length; i++) {
			if (
				level.bridgesV[i].x === bridge.x &&
				level.bridgesV[i].y0 === bridge.y0 &&
				level.bridgesV[i].y1 === bridge.y1
			) {
				if (level.bridgesV[i].n + n > 2) {
					added = false;
					removeBridge(level, island0, island1, level.bridgesV[i].n);
				} else {
					level.bridgesV[i].n += n;
				}
				found = true;
				break;
			}
		}
		if (!found) {
			level.bridgesV.push(bridge);
		}
	} else {
		const bridge = {
			x0: Math.min(island0.x, island1.x),
			x1: Math.max(island0.x, island1.x),
			y: island0.y,
			n
		};
		let found = false;
		for (let i = 0; i < level.bridgesH.length; i++) {
			if (
				level.bridgesH[i].x0 === bridge.x0 &&
				level.bridgesH[i].x1 === bridge.x1 &&
				level.bridgesH[i].y === bridge.y
			) {
				if (level.bridgesH[i].n + n > 2) {
					added = false;
					removeBridge(level, island0, island1, level.bridgesH[i].n);
				} else {
					level.bridgesH[i].n += n;
				}
				found = true;
				break;
			}
		}
		if (!found) {
			level.bridgesH.push(bridge);
		}
	}
	if (added) {
		island0.n += n;
		island1.n += n;
	}
};

export const removeBridge = (level: LevelData, island0: Island, island1: Island, n = 1) => {
	if (island0.x === island1.x) {
		const bridge = {
			x: island0.x,
			y0: Math.min(island0.y, island1.y),
			y1: Math.max(island0.y, island1.y)
		};
		for (let i = 0; i < level.bridgesV.length; i++) {
			if (
				level.bridgesV[i].x === bridge.x &&
				level.bridgesV[i].y0 === bridge.y0 &&
				level.bridgesV[i].y1 === bridge.y1
			) {
				level.bridgesV[i].n -= n;
				if (level.bridgesV[i].n <= 0) {
					level.bridgesV.splice(i, 1);
				}
				break;
			}
		}
	} else {
		const bridge = {
			x0: Math.min(island0.x, island1.x),
			x1: Math.max(island0.x, island1.x),
			y: island0.y
		};
		for (let i = 0; i < level.bridgesH.length; i++) {
			if (
				level.bridgesH[i].x0 === bridge.x0 &&
				level.bridgesH[i].x1 === bridge.x1 &&
				level.bridgesH[i].y === bridge.y
			) {
				level.bridgesH[i].n -= n;
				if (level.bridgesH[i].n <= 0) {
					level.bridgesH.splice(i, 1);
				}
				break;
			}
		}
	}
	island0.n -= n;
	island1.n -= n;
};

export const checkVictory = (level: LevelData) => {
	let victory =
		level.bridgesH.length === level.solution.bridgesH.length &&
		level.bridgesV.length === level.solution.bridgesV.length;
	if (victory) {
		level.bridgesH.forEach((bridgeH) => {
			const found = level.solution.bridgesH.find(
				(sBH) =>
					bridgeH.x0 === sBH.x0 &&
					bridgeH.x1 === sBH.x1 &&
					bridgeH.y === sBH.y &&
					bridgeH.n === sBH.n
			);
			if (!found) {
				victory = false;
			}
		});
	}
	if (victory) {
		level.bridgesV.forEach((bridgeV) => {
			const found = level.solution.bridgesV.find(
				(sBV) =>
					bridgeV.x === sBV.x &&
					bridgeV.y0 === sBV.y0 &&
					bridgeV.y1 === sBV.y1 &&
					bridgeV.n === sBV.n
			);
			if (!found) {
				victory = false;
			}
		});
	}
	return victory;
};
