import IShortBuildingInfo from "./short-building-info";

export default interface IResourceBuildingList {
    [key: string]: IShortBuildingInfo;
    metalMine: IShortBuildingInfo;
    crystalMine: IShortBuildingInfo;
    deuteriumSynthesizer: IShortBuildingInfo;
    solarPlant: IShortBuildingInfo;
    fusionReactor: IShortBuildingInfo;
    solarSatellite: IShortBuildingInfo;
    metalStorage: IShortBuildingInfo;
    crystalStorage: IShortBuildingInfo;
    deuteriumStorage: IShortBuildingInfo;
}