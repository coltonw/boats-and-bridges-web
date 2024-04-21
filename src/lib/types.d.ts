type Island = {
	x: number;
	y: number;
	b: number;
	n: number;
	selected?: boolean;
};

type BridgeH = {
	x0: number;
	x1: number;
	y: number;
	n: number;
};

type BridgeV = {
	x: number;
	y0: number;
	y1: number;
	n: number;
};

type LevelData = {
	islands: Island[];
	bridgesH: BridgeH[];
	bridgesV: BridgeV[];
};
