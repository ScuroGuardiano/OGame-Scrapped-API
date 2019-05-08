import OGameFunction from "./ogame-function";
import { Page } from "puppeteer";
import stringResourceToNumber from "../helpers/str-res-to-num";

export default new OGameFunction([], async (gamePage: Page) => {
    await Promise.all([
        gamePage.waitFor("#resources_metal"),
        gamePage.waitFor("#resources_crystal"),
        gamePage.waitFor("#resources_deuterium"),
        gamePage.waitFor("#resources_darkmatter"),
        gamePage.waitFor("#resources_energy")
    ]);
    let resourcesString = await gamePage.evaluate(() => {
        return {
            metal: document.querySelector('#resources_metal').textContent.trim(),
            crystal: document.querySelector('#resources_crystal').textContent.trim(),
            deuterium: document.querySelector('#resources_deuterium').textContent.trim(),
            energy: document.querySelector('#resources_energy').textContent.trim(),
            darkMatter: document.querySelector('#resources_darkmatter').textContent.trim()
        };
    });
    return {
        metal: stringResourceToNumber(resourcesString.metal),
        crystal: stringResourceToNumber(resourcesString.crystal),
        deuterium: stringResourceToNumber(resourcesString.deuterium),
        energy: stringResourceToNumber(resourcesString.energy),
        darkMatter: stringResourceToNumber(resourcesString.darkMatter)
    };
});
