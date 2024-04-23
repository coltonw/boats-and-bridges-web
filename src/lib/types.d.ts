type Island = {
	x: number;
	y: number;
	b: number | null;
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

type FloatingBridge = {
	left: number;
	top: number;
	width: number;
	rotate: number;
};

type LevelData = {
	name: string;
	islands: Island[];
	bridgesH: BridgeH[];
	bridgesV: BridgeV[];
	solution: {
		bridgesH: BridgeH[];
		bridgesV: BridgeV[];
	};
	previousUri?: string;
	nextUri?: string;
};

type LevelChange = {
	add?: {
		bridgesH?: BridgeH[];
		bridgesV?: BridgeV[];
	};
	remove?: {
		bridgesH?: BridgeH[];
		bridgesV?: BridgeV[];
	};
	update?: {
		islands?: Island[];
		bridgesH?: BridgeH[];
		bridgesV?: BridgeV[];
	};
};
