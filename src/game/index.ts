import { Page } from "puppeteer";
import OGamePages from "../ogame-pages";
import { URL } from 'url';
import getResources from "./functions/get-resources";
import OGameFunction from "./functions/ogame-function";
import getResourceBuildings from "./functions/get-resource-buildings";
import getStationBuildings from "./functions/get-station-buildings";

export default class OGame {
    constructor(private page: Page) {
        this.currentPage = OGamePages.OVERVIEW;
    }
    private currentPage: OGamePages;
    public async switchPage(pageName: OGamePages) {
        const url = new URL(await this.page.url());
        url.search = `page=${pageName}`;
        await this.page.goto(url.href);
        this.currentPage = pageName;
    }
    public async getResources() {
        await this.makeSureItsOnNeededPage(getResources);
        return getResources.exec(this.page);
    }
    public async getResourceBuildings() {
        await this.makeSureItsOnNeededPage(getResourceBuildings);
        return getResourceBuildings.exec(this.page);
    }
    public async getStationBuildings() {
        await this.makeSureItsOnNeededPage(getStationBuildings);
        return getStationBuildings.exec(this.page);
    }
    private async makeSureItsOnNeededPage(fn: OGameFunction<any>) {
        if(fn.canBeExecutedOnPage(this.currentPage))
            return;
        await this.switchPage(fn.getNeededPageName());
    }
}
