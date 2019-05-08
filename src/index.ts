import { config as dotenv } from 'dotenv';
dotenv();
import { launch as launchBrowser, Page }  from 'puppeteer';
import OGame from './game';
import OGamePages from './ogame-pages';

async function login(ogameLoginPage: Page, login: string, password: string) {
    await ogameLoginPage.evaluate((login, password) => {
        document.querySelector<HTMLInputElement>('#usernameLogin').value = login;
        document.querySelector<HTMLInputElement>('#passwordLogin').value = password;
        document.querySelector<HTMLInputElement>('#loginSubmit').click();
    }, login, password);
}
async function navigateToDefaultServer(ogameLobbyPage: Page): Promise<Page> {
    await ogameLobbyPage.waitFor('.button-default');
    const [popup] = await Promise.all<Page, void>([
        new Promise(resolve => ogameLobbyPage.once('popup', resolve)),
        ogameLobbyPage.click('.button-default')
    ]);
    return popup;
}

module.exports = async function main() {
    const browser = await launchBrowser({
        headless: false,
        defaultViewport: null,
        args: [`--window-size=1280,720`]
    });
    const page = await browser.newPage();
    await page.goto("http://ogame.pl");
    await login(page, process.env.OGAME_LOGIN, process.env.OGAME_PASSWORD);
    const gamePage = await navigateToDefaultServer(page);
    await gamePage.waitFor('title');
    console.log(await gamePage.title());
    let game = new OGame(gamePage);
    console.log(await game.getResources());
    console.log(await game.getResourceBuildings());
    console.log(await game.getStationBuildings());
    await game.switchPage(OGamePages.GALAXY);
}
