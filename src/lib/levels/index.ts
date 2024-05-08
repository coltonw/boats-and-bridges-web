import howToPlay from './howToPlay.yml';
import howToWin from './howToWin.yml';
import doubleBridge from './doubleBridge.yml';
import noTripleBridges from './noTripleBridges.yml';
import noCrossingBridges from './noCrossingBridges.yml';
import mustConnect from './mustConnect.yml';
import warmingUp from './warmingUp.yml';
import questionMarkIslands from './questionMarkIslands.yml';
import atLeastOneBridgeMaybeTwo from './atLeastOneBridgeMaybeTwo.yml';
import threesGalore from './threesGalore.yml';
import onesOnOnes from './onesOnOnes.yml';
import luckyNumber7 from './luckyNumber7.yml';
import castleOfTwos from './castleOfTwos.yml';
import grapplingHooks from './grapplingHooks.yml';
import myLittlePigeonhole from './myLittlePigeonhole.yml';
import bigPigeonhole from './bigPigeonhole.yml';
import whichOneWhichOne from './whichOneWhichOne.yml';
import advancedGrappling from './advancedGrappling.yml';
import theConnectionCorner from './theConnectionCorner.yml';
import pigeonholeMadness from './pigeonholeMadness.yml';
import bringingItAllTogether from './bringingItAllTogether.yml';
import myFirstBoat from './myFirstBoat.yml';
import openOcean from './openOcean.yml';
import lazyRiver from './lazyRiver.yml';
import tunnel from './tunnel.yml';
import twoBoats from './twoBoats.yml';
import simpleBoat from './simpleBoat.yml';
import aroundTheOutside from './aroundTheOutside.yml';
import boatPigeonhole from './boatPigeonhole.yml';
import timeForTrucks from './timeForTrucks.yml';
import aTaleOfTwoTrucks1 from './aTaleOfTwoTrucks1.yml';
import aTaleOfTwoTrucks2 from './aTaleOfTwoTrucks2.yml';
import brainTrails from './brainTrails.yml';
import twoTruckPaths from './twoTruckPaths.yml';
import boatsAndTrucks from './boatsAndTrucks.yml';
import boatsAndDoubleBridges from './boatsAndDoubleBridges.yml';
import watchOutForGridlock from './watchOutForGridlock.yml';
import trafficJam from './trafficJam.yml';
import fiveQuestions from './fiveQuestions.yml';
import cheshireCat from './cheshireCat.yml';
import dontCombineThose from './dontCombineThose.yml';
import squareOfMystery from './squareOfMystery.yml';
import piratesHo from './piratesHo.yml';
import theChase from './theChase.yml';
import perilousJourneyHome from './perilousJourneyHome.yml';
import theBilge from './theBilge.yml';
import xMarksTheSpot from './xMarksTheSpot.yml';
import tripleBoatTango from './tripleBoatTango.yml';
import tidalPools from './tidalPools.yml';
import snakingAround from './snakingAround.yml';
import viciousPirates from './viciousPirates.yml';
import fourLeafHighway from './fourLeafHighway.yml';
import highwayPatrol from './highwayPatrol.yml';
import boatsAndBridgesPiratesAndTrucks from './boatsAndBridgesPiratesAndTrucks.yml';
import bloominQuestions from './bloominQuestions.yml';
import howDoIEvenStart from './howDoIEvenStart.yml';
import oddIslands from './oddIslands.yml';
import getEven from './getEven.yml';
import theSameButDifferent from './theSameButDifferent.yml';

const levels: LevelData[] = [
	howToPlay, // 1
	howToWin, // 2
	doubleBridge, // 3
	noTripleBridges, // 4
	noCrossingBridges, // 5
	mustConnect, // 6
	warmingUp, // 7
	questionMarkIslands, // 8
	atLeastOneBridgeMaybeTwo, // 9
	onesOnOnes, // 10
	luckyNumber7, // 11
	castleOfTwos, // 12
	grapplingHooks, // 13
	myLittlePigeonhole, // 14
	threesGalore, // 15
	bigPigeonhole, // 16
	whichOneWhichOne, // 17
	advancedGrappling, // 18
	theConnectionCorner, // 19
	pigeonholeMadness, // 20
	bringingItAllTogether, // 21
	myFirstBoat, // 22
	openOcean, // 23
	lazyRiver, // 24
	twoBoats, // 25
	simpleBoat, // 26
	tunnel, // 27
	aroundTheOutside, // 28
	boatPigeonhole, // 29
	timeForTrucks, // 30
	aTaleOfTwoTrucks1, // 31
	aTaleOfTwoTrucks2, // 32
	brainTrails, // 33
	twoTruckPaths, // 34
	boatsAndTrucks, // 35
	boatsAndDoubleBridges, // 36
	watchOutForGridlock, // 37
	trafficJam, // 38
	fiveQuestions, // 39
	cheshireCat, // 40
	dontCombineThose, // 41
	squareOfMystery, // 42
	piratesHo, // 43
	theChase, // 44
	perilousJourneyHome, // 45
	theBilge, // 46
	xMarksTheSpot, // 47
	tripleBoatTango, // 48
	snakingAround, // 49
	fourLeafHighway, // 50
	boatsAndBridgesPiratesAndTrucks, // 51
	tidalPools, // 52
	highwayPatrol, // 53
	viciousPirates, // 54
	bloominQuestions, // 55
	howDoIEvenStart, // 56
	oddIslands, // 57
	getEven, // 58
	theSameButDifferent // 59
];
levels.forEach((level, i) => {
	level.undoStack = [];
	level.id = `${i + 1}`;
	if (i > 0) {
		level.previousUri = `/levels/${i}`;
	}
	if (i < levels.length - 1) {
		level.nextUri = `/levels/${i + 2}`;
	}
});
export default levels;
