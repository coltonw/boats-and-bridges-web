let prevLevelName = '';
export const setPrevLevelName = (name: string) => {
	prevLevelName = name;
};

export const transitioning = (name: string) => {
	return prevLevelName === '' || name !== prevLevelName;
};
