import OGameFunction from "./ogame-function";
import OGamePages from "../../ogame-pages";
import { Page } from "puppeteer";
import IStationBuildingList from "../interfaces/station-building-list";

export default new OGameFunction([
    OGamePages.STATION
], async (gamePage: Page) => {
    await gamePage.waitFor("#stationbuilding");
    return gamePage.evaluate((): IStationBuildingList => {
        const numberRegex = /[\d]+/g;
        function isBuildable(el: Element) {
            return el.className == "on";
        }
        function getLevel(el: Element) {
            return parseInt(el.querySelector('.level').textContent.match(numberRegex)[0]);
        }
        const elements: { [key: string]: Element } = {
            roboticsFactory: document.querySelector("#button0"),
            shipyard: document.querySelector("#button1"),
            researchLab: document.querySelector("#button2"),
            allianceDepot: document.querySelector("#button3"),
            missileSilo: document.querySelector("#button4"),
            naniteFactory: document.querySelector("#button5"),
            terraformer: document.querySelector("#button6"),
            spacedock: document.querySelector("#button7")
        };
        const ret = {} as IStationBuildingList;
        Object.keys(elements).forEach(buildingKey => {
            ret[buildingKey] = {
                buildable: isBuildable(elements[buildingKey]),
                level: getLevel(elements[buildingKey]),
                name: buildingKey
            }
        });
        return ret;
    });
});
