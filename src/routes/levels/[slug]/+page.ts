import levels from '$lib/levels/';
export function load({ params }): LevelData {
	const levelIndex = parseInt(params.slug, 10);
	let level = levels[0];
	if (!isNaN(levelIndex) && levelIndex <= levels.length && levelIndex > 0) {
		level = levels[levelIndex - 1];
	}

	return level;
}
