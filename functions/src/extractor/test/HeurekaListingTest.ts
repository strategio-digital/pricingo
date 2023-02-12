import Puppeteer from "../../scraper/Puppeteer";

(async() => {
    const scraper = await new Puppeteer('HeurekaListing', false, null, 1500);
    await scraper.createBrowser(1920, 1080);
    const result = await scraper.getPageResult('https://chytre-hodinky.heureka.cz/apple-watch-series-6-44mm/', false);

    await scraper.closeBrowser();
    console.log(JSON.stringify(result, null, 4));
})();
