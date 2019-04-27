import OGamePages from "../../ogame-pages";

export default class OGameFunction<T extends (...args: any) => any> {
    /**
     * @param ogame OGame instance
     * @param availablePages list of available pages, empty means available on any page
     * @param fn function lol
     */
    public constructor(private availablePages: Array<OGamePages>, private fn: T) {}
    public canBeExecutedOnPage(pageName: OGamePages) {
        if(this.availablePages.length === 0)
            return true;
        return this.availablePages.findIndex(page => page === pageName) != -1;
    }
    /**
     * Returns first page from available pages list. If any page can match it will return null
     */
    public getNeededPageName(): OGamePages {
        if(this.availablePages.length === 0)
            return null;
        return this.availablePages[0];
    }
    public readonly exec: T = this.fn;
}
