/// <reference types="unplugin-icons/types/svelte" />

type Coordinates = {
	x: number;
	y: number;
};

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

type BoatDock = {
	boat: {
		x: number;
		y: number;
	};
	dock: {
		x: number;
		y: number;
	};
};

type TruckGarage = {
	truck: {
		x: number;
		y: number;
	};
	garage: {
		x: number;
		y: number;
	};
};

type Pirate = {
	x: number;
	y: number;
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

type LevelData = {
	id: string;
	name: string;
	version?: number;
	islands: Island[];
	boats: BoatDock[];
	trucks: TruckGarage[];
	pirates: Pirate[];
	bridgesH: BridgeH[];
	bridgesV: BridgeV[];
	undoStack: LevelChange[];
	loaded?: boolean;
	solution: {
		bridgesH: BridgeH[];
		bridgesV: BridgeV[];
	};
	tip?: string;
	loaded?: boolean;
	previousUri?: string;
	nextUri?: string;
};

type LevelStatus = {
	id: string;
	optional?: boolean;
};

type LevelGroup = {
	name: string;
	unlock: number;
	levels: LevelStatus[];
};

type VictoryData = {
	[id: string]: boolean;
};

// Fixes a weird safari bug
// https://stackoverflow.com/questions/58473921/why-cant-i-use-touchevent-in-safari
type AppTouchEvent = TouchEvent;
