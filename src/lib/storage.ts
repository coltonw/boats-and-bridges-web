type SaveData = {
	islands: Island[];
	bridgesH: BridgeH[];
	bridgesV: BridgeV[];
	undoStack: LevelChange[];
};

export const saveLevel = (level: LevelData) => {
	localStorage.setItem(
		level.name,
		JSON.stringify({
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			islands: level.islands.flatMap(({ selected, ...island }) => {
				if (island.n > 0) {
					return [island];
				}
				return [];
			}),
			bridgesH: level.bridgesH,
			bridgesV: level.bridgesV,
			undoStack: level.undoStack
		})
	);
};

export const loadLevel = (level: LevelData) => {
	let loaded: SaveData = {
		islands: [],
		bridgesH: [],
		bridgesV: [],
		undoStack: []
	};
	try {
		const stored = localStorage.getItem(level.name);
		if (stored) {
			const temp = JSON.parse(stored);
			const n = temp.islands.reduce((acc: number, i: Island) => {
				return acc + i.n;
			}, 0);
			const h = temp.bridgesH.reduce((acc: number, b: BridgeH) => {
				return acc + b.n;
			}, 0);
			const v = temp.bridgesV.reduce((acc: number, b: BridgeV) => {
				return acc + b.n;
			}, 0);
			if (n === 2 * (h + v)) {
				loaded = temp;
			}
		}
	} catch (e) {
		console.log('Failed to load');
	}

	level.islands = level.islands.map((baseIsland) => {
		const loadedIsland = loaded.islands.find(
			(lI) => baseIsland.x === lI.x && baseIsland.y === lI.y
		);
		if (loadedIsland) {
			return {
				...baseIsland,
				n: loadedIsland.n
			};
		}
		return {
			...baseIsland,
			n: 0
		};
	});
	level.bridgesH = loaded.bridgesH;
	level.bridgesV = loaded.bridgesV;
	level.undoStack = loaded.undoStack;
	level.loaded = true;
};

export const saveVictory = (level: LevelData, victory: boolean) => {
	let loaded: VictoryData = {};
	try {
		const stored = localStorage.getItem('victoryData');
		if (stored) {
			const temp = JSON.parse(stored);
			loaded = temp;
		}
	} catch (e) {
		console.log('Failed to load');
	}
	loaded[level.id] = victory;
	localStorage.setItem('victoryData', JSON.stringify(loaded));
};

export const loadVictoryMap = (victoryMap: VictoryData) => {
	let loaded: VictoryData = {};
	try {
		const stored = localStorage.getItem('victoryData');
		if (stored) {
			loaded = JSON.parse(stored);
		}
	} catch (e) {
		console.log('Failed to load');
	}
	const loadedKeys = Object.keys(loaded);
	for (let i = 0; i < loadedKeys.length; i++) {
		victoryMap[loadedKeys[i]] = loaded[loadedKeys[i]];
	}
};
