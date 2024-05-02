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

export const loadLevel = (level: LevelData): SaveData => {
	let loaded: SaveData = {
		islands: [],
		bridgesH: [],
		bridgesV: [],
		undoStack: []
	};
	try {
		const stored = localStorage.getItem(level.name);
		console.log('stored', stored);
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
	return {
		islands: loaded.islands || [],
		bridgesH: loaded.bridgesH || [],
		bridgesV: loaded.bridgesV || [],
		undoStack: loaded.undoStack || []
	};
};
