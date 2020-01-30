import WadSector = require('../wad/wad-sector');

class GameSector
{
  floorHeight: number;
	ceilingHeight: number;
	floorPic: string;
	ceilingPic: string;
	lightLevel: number;
	special: number;
	tag: number;
	thingList: object | null;
	cachedHeight: number;
  oldFloorHeight: number;
  interpFloorHeight: number;
  oldCeilingHeight: number;
  interpCeilingHeight: number;
  oldGameTic: number;

  constructor (wadSector: WadSector)
  {
  	this.floorHeight = wadSector.floorHeight;
  	this.ceilingHeight = wadSector.ceilingHeight;
  	this.floorPic = wadSector.floorPic;
  	this.ceilingPic = wadSector.ceilingPic;
  	this.lightLevel = wadSector.lightLevel;
  	this.special = wadSector.special;
  	this.tag = wadSector.tag;
  	this.thingList = null;
  	this.cachedHeight = 0;
    this.oldFloorHeight = this.floorHeight;
    this.interpFloorHeight = this.floorHeight;
    this.oldCeilingHeight = this.ceilingHeight;
    this.interpCeilingHeight = this.ceilingHeight;
    this.oldGameTic = -1;
  }
}

export = GameSector;
