import level001 from './level001.yml';
import level002 from './level002.yml';
import level003 from './level003.yml';
import level004 from './level004.yml';
import level005 from './level005.yml';
import level006 from './level006.yml';
import level007 from './level007.yml';
import level008 from './level008.yml';
import level009 from './level009.yml';
import level010 from './level010.yml';
import level011 from './level011.yml';
import level012 from './level012.yml';
import level013 from './level013.yml';
import level014 from './level014.yml';
import level015 from './level015.yml';
import level016 from './level016.yml';
import level017 from './level017.yml';
import level018 from './level018.yml';
import level019 from './level019.yml';
import level020 from './level020.yml';
import level021 from './level021.yml';
import level022 from './level022.yml';
import level023 from './level023.yml';
import level024 from './level024.yml';
import level025 from './level025.yml';
import level026 from './level026.yml';
import level027 from './level027.yml';
import level028 from './level028.yml';
import level029 from './level029.yml';
import level030 from './level030.yml';
import level031 from './level031.yml';
import level032 from './level032.yml';
import level033 from './level033.yml';
import level034 from './level034.yml';
import level035 from './level035.yml';
import level036 from './level036.yml';
import level037 from './level037.yml';
import level038 from './level038.yml';
import level039 from './level039.yml';
import level040 from './level040.yml';
import level041 from './level041.yml';
import level042 from './level042.yml';
import level043 from './level043.yml';
import level044 from './level044.yml';
import level045 from './level045.yml';
import level046 from './level046.yml';
import level047 from './level047.yml';
import level048 from './level048.yml';
import level049 from './level049.yml';
import level050 from './level050.yml';
import level051 from './level051.yml';
import level052 from './level052.yml';
import level053 from './level053.yml';
import level054 from './level054.yml';
import level055 from './level055.yml';
import level056 from './level056.yml';
import level057 from './level057.yml';
import level058 from './level058.yml';

const levels: LevelData[] = [
	level001,
	level002,
	level003,
	level004,
	level005,
	level006,
	level007,
	level008,
	level009,
	level010,
	level011,
	level012,
	level013,
	level014,
	level015,
	level016,
	level017,
	level018,
	level019,
	level020,
	level021,
	level022,
	level023,
	level024,
	level025,
	level026,
	level027,
	level028,
	level029,
	level030,
	level031,
	level032,
	level033,
	level034,
	level035,
	level036,
	level037,
	level038,
	level039,
	level040,
	level041,
	level042,
	level043,
	level044,
	level045,
	level046,
	level047,
	level048,
	level049,
	level050,
	level051,
	level052,
	level053,
	level054,
	level055,
	level056,
	level057,
	level058
];
levels.forEach((level, i) => {
	if (i > 0) {
		level.previousUri = `/levels/${i}`;
	}
	if (i < levels.length - 1) {
		level.nextUri = `/levels/${i + 2}`;
	}
});
export default levels;
