import IShortBuildingInfo from "./short-building-info";

export default interface IStationBuildingList {
    [key: string]: IShortBuildingInfo;
    allianceDepot: IShortBuildingInfo;
    missileSilo: IShortBuildingInfo;
    naniteFactory: IShortBuildingInfo;
    researchLab: IShortBuildingInfo;
    roboticsFactory: IShortBuildingInfo;
    shipyard: IShortBuildingInfo;
    terraformer: IShortBuildingInfo;
    spacedock: IShortBuildingInfo;
}
