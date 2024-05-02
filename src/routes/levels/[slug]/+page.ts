import { browser } from '$app/environment';
import levels from '$lib/levels/';
import { loadLevel } from '$lib/storage';
export const ssr = false;
export function load({ params }): LevelData {
	const levelIndex = parseInt(params.slug, 10);
	let level = levels[0];
	if (!isNaN(levelIndex) && levelIndex <= levels.length && levelIndex > 0) {
		level = levels[levelIndex - 1];
	}
	if (browser) {
		const loaded = loadLevel(level);
		console.log('loaded', loaded);
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
			return baseIsland;
		});
		console.log('actualLoadedIslands', level.islands);
		level.bridgesH = loaded.bridgesH;
		level.bridgesV = loaded.bridgesV;
		level.undoStack = loaded.undoStack;
	}
	return level;
}
