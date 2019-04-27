import OGameFunction from "./ogame-function";
import OGamePages from "../../ogame-pages";
import { Page } from "puppeteer";
import IResourceBuildingList from "../interfaces/resource-building-list";

export default new OGameFunction([
    OGamePages.RESOURCES
], async (gamePage: Page) => {
    await Promise.all([
        gamePage.waitFor("#building"),
        gamePage.waitFor("#storage")
    ]);
    return gamePage.evaluate((): IResourceBuildingList => {
        const numberRegex = /[\d]+/g;
        function isBuildable(el: Element) {
            return el.className == "on";
        }
        function getLevel(el: Element) {
            return parseInt(el.querySelector('.level').textContent.match(numberRegex)[0]);
        }
        const elements: { [key: string]: Element } = {
            metalMine: document.querySelector("#button1"),
            crystalMine: document.querySelector("#button2"),
            deuteriumSynthesizer: document.querySelector("#button3"),
            solarPlant: document.querySelector("#button4"),
            fusionReactor: document.querySelector("#button5"),
            solarSatellite: document.querySelector("#button6"),
            metalStorage: document.querySelector("#button7"),
            cystalStorage: document.querySelector("#button8"),
            deuteriumStorage: document.querySelector("#button9")
        }
        const ret = {} as IResourceBuildingList;
        Object.keys(elements).forEach(buildingKey => {
            ret[buildingKey] = {
                buildable: isBuildable(elements[buildingKey]),
                level: getLevel(elements[buildingKey]),
                name: buildingKey
            }
        });
        return ret;
    });
})