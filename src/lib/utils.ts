const bridgesLeft = (island: Island) => (island.b || 8) - island.n;

const vertAdjacent = (level: LevelData, island0: Coordinates, island1: Coordinates) => {
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

const horAdjacent = (level: LevelData, island0: Coordinates, island1: Coordinates) => {
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

export const adjacent = (level: LevelData, island0: Coordinates, island1: Coordinates) => {
	return vertAdjacent(level, island0, island1) || horAdjacent(level, island0, island1);
};

export const full = (island: Island) => bridgesLeft(island) <= 0;

export const addBridge = (
	level: LevelData,
	island0: Island,
	island1: Island,
	n = 1
): LevelChange => {
	let levelChange: LevelChange = {};
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
					levelChange = removeBridge(level, island0, island1, level.bridgesV[i].n);
				} else {
					levelChange = {
						update: {
							bridgesV: [
								{
									...level.bridgesV[i],
									n: level.bridgesV[i].n + n
								}
							]
						}
					};
				}
				found = true;
				break;
			}
		}
		if (!found) {
			levelChange = {
				add: {
					bridgesV: [bridge]
				}
			};
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
					levelChange = removeBridge(level, island0, island1, level.bridgesH[i].n);
				} else {
					levelChange = {
						update: {
							bridgesH: [
								{
									...level.bridgesH[i],
									n: level.bridgesH[i].n + n
								}
							]
						}
					};
				}
				found = true;
				break;
			}
		}
		if (!found) {
			levelChange = {
				add: {
					bridgesH: [bridge]
				}
			};
		}
	}
	if (!levelChange.remove) {
		levelChange.update = levelChange.update || {};
		levelChange.update.islands = [
			{ ...island0, n: island0.n + n },
			{ ...island1, n: island1.n + n }
		];
	}
	return levelChange;
};

export const removeBridge = (
	level: LevelData,
	island0: Island,
	island1: Island,
	n = 1
): LevelChange => {
	const levelChange: LevelChange = {};
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
				if (level.bridgesV[i].n - n <= 0) {
					levelChange.remove = {};
					levelChange.remove.bridgesV = [level.bridgesV[i]];
				} else {
					levelChange.update = {};
					levelChange.update.bridgesV = [
						{
							...level.bridgesV[i],
							n: level.bridgesV[i].n - n
						}
					];
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
				if (level.bridgesH[i].n - n <= 0) {
					levelChange.remove = {};
					levelChange.remove.bridgesH = [level.bridgesH[i]];
				} else {
					levelChange.update = {};
					levelChange.update.bridgesH = [
						{
							...level.bridgesH[i],
							n: level.bridgesH[i].n - n
						}
					];
				}
				break;
			}
		}
	}
	levelChange.update = levelChange.update || {};
	levelChange.update.islands = [
		{ ...island0, n: island0.n - n },
		{ ...island1, n: island1.n - n }
	];
	return levelChange;
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

export const checkFull = (level: LevelData) => {
	return !level.islands.find((island) => island.b && island.n !== island.b);
};

const connectedIslands = (level: LevelData, island: Island) => {
	const result: Island[] = [];
	level.bridgesH.forEach((bridgeH) => {
		if (bridgeH.x0 === island.x && bridgeH.y === island.y) {
			const connected = level.islands.find((i) => i.x === bridgeH.x1 && i.y === bridgeH.y);
			if (!connected) {
				throw new Error(`Bridge connected to nothing: ${bridgeH}`);
			}
			result.push(connected);
		}
		if (bridgeH.x1 === island.x && bridgeH.y === island.y) {
			const connected = level.islands.find((i) => i.x === bridgeH.x0 && i.y === bridgeH.y);
			if (!connected) {
				throw new Error(`Bridge connected to nothing: ${bridgeH}`);
			}
			result.push(connected);
		}
	});
	level.bridgesV.forEach((bridgeV) => {
		if (bridgeV.x === island.x && bridgeV.y0 === island.y) {
			const connected = level.islands.find((i) => i.x === bridgeV.x && i.y === bridgeV.y1);
			if (!connected) {
				throw new Error(`Bridge connected to nothing: ${bridgeV}`);
			}
			result.push(connected);
		}
		if (bridgeV.x === island.x && bridgeV.y1 === island.y) {
			const connected = level.islands.find((i) => i.x === bridgeV.x && i.y === bridgeV.y0);
			if (!connected) {
				throw new Error(`Bridge connected to nothing: ${bridgeV}`);
			}
			result.push(connected);
		}
	});
	return result;
};

const getConnectedIslands = (level: LevelData, startingIsland: Island) => {
	const traversingStack = [startingIsland];
	const visited = [startingIsland];

	while (traversingStack.length > 0) {
		const island = traversingStack.pop()!;
		const connected = connectedIslands(level, island);
		connected.forEach((cI) => {
			if (!visited.find((i) => i.x === cI.x && i.y === cI.y)) {
				visited.push(cI);
				traversingStack.unshift(cI);
			}
		});
	}
	return visited;
};

const bridgeBetween = (level: LevelData, island0: Coordinates, island1: Coordinates) => {
	let bridge = null;
	if (island0.x === island1.x) {
		level.bridgesV.forEach((bridgeV: BridgeV) => {
			if (
				bridgeV.x === island0.x &&
				bridgeV.y0 === Math.min(island0.y, island1.y) &&
				bridgeV.y1 === Math.max(island0.y, island1.y)
			) {
				bridge = bridgeV;
				return false;
			}
		});
	}
	if (island0.y === island1.y) {
		level.bridgesH.forEach((bridgeH: BridgeH) => {
			if (
				bridgeH.y === island0.y &&
				bridgeH.x0 === Math.min(island0.x, island1.x) &&
				bridgeH.x1 === Math.max(island0.x, island1.x)
			) {
				bridge = bridgeH;
				return false;
			}
		});
	}
	return bridge;
};

const doubleConnectedAdjacentIslands = (level: LevelData, island: Coordinates) => {
	const result: Island[] = [];
	level.islands.forEach((i) => {
		if (adjacent(level, i, island) && (bridgeBetween(level, i, island) || { n: 0 }).n > 1) {
			result.push(i);
		}
	});
	return result;
};

const doubleConnected = (level: LevelData, island1: Coordinates, island2: Coordinates) => {
	const traversingStack = [island1];
	const visited = [island1];

	let isConnected = false;
	while (traversingStack.length > 0) {
		const island = traversingStack.pop()!;
		const connected = doubleConnectedAdjacentIslands(level, island);
		connected.forEach((cI: Island) => {
			if (cI.x === island2.x && cI.y === island2.y) {
				isConnected = true;
				return false;
			}
			if (!visited.find((i) => i.x === cI.x && i.y === cI.y)) {
				visited.push(cI);
				if (!cI.b || cI.b > 3) {
					traversingStack.unshift(cI);
				}
			}
		});
	}
	return isConnected;
};

export const connectionError = (level: LevelData): Island[] => {
	const connectedIslands = getConnectedIslands(level, level.islands[0]);
	if (connectedIslands.length === level.islands.length) {
		return [];
	} else if (connectedIslands.length <= 0.5 * level.islands.length) {
		return connectedIslands;
	} else {
		const otherIsland = level.islands.find((island) => {
			return !!connectedIslands.find((cI) => island.x === cI.x && island.y === cI.y);
		});
		if (otherIsland) {
			return getConnectedIslands(level, otherIsland);
		}
		console.log('We could not find the missing islands...');
		return connectedIslands;
	}
};

export const truckError = (level: LevelData): boolean => {
	if (level.trucks.length === 0) {
		return false;
	}
	for (let i = 0; i < level.trucks.length; i++) {
		if (!doubleConnected(level, level.trucks[i].truck, level.trucks[i].garage)) {
			return true;
		}
	}
	return false;
};
