import levels from '$lib/levels/';
export const ssr = false;
export function load({ params }): LevelData {
	const levelIndex = parseInt(params.slug, 10);
	if (isNaN(levelIndex) || levelIndex > levels.length || levelIndex < 1) {
		return levels[0];
	}
	return levels[levelIndex - 1];
}
