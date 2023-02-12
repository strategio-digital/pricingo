import * as puppeteer from 'puppeteer';
import {readFileSync} from 'fs';
import {Proxy} from "../types/Proxy";
import {ListingResult} from "../types/ListingResult";
import {ComparatorResult} from "../types/ComparatorResult";
import {Utils} from "../utils/Utils";
import {ScraperType} from "../types/ScraperType";

export default class Puppeteer {
    scraperType: ScraperType;
    headless: boolean;
    proxy: Proxy|null;
    waitForTimeoutMs: number;
    browser: any
    browserArgs: Array<string> = [];

    constructor(scraperType: ScraperType, headless: boolean, proxy: Proxy|null, waitForTimeoutMs: number) {
        this.scraperType = scraperType;
        this.headless = headless;
        this.proxy = proxy;
        this.waitForTimeoutMs = waitForTimeoutMs;
    }

    async createBrowser(width: number, height: number): Promise<void> {
        this.browserArgs.push(`--window-size=${width},${height}`);
        if (this.proxy) this.browserArgs.push(`--proxy-server=${this.proxy.method}://${this.proxy.server}:${this.proxy.port}`);

        this.browser = await puppeteer.launch({
            headless: this.headless,
            defaultViewport: { width: width, height: height },
            args: this.browserArgs
        });
    }

    async getPageResult(targetUrl: string, saveData: boolean = true) : Promise<ComparatorResult> {
        const startedAt = new Date();
        const page = await this.browser.newPage();
        if (this.proxy) await page.authenticate({ username: this.proxy.username , password: this.proxy.password });

        console.log(`Going to... ${targetUrl}`);
        await page.goto(targetUrl);

        console.log('Injecting scripts...');
        await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.min.js' });
        //await page.addScriptTag({ path: './lib/extractor/HeurekaListing.js' });

        console.log(`Creating pageFunction...`);
        const scraperCode = await readFileSync(`./lib/extractor/${this.scraperType}.js`, 'utf-8');
        const pageFunctionCode = `let exports = {}; ${scraperCode} (new ${this.scraperType}()).execute($);`;

        console.log(`Waiting for ${this.waitForTimeoutMs} ms...`);
        await page.waitForTimeout(this.waitForTimeoutMs);

        console.log(`Evaluating scraper: ${this.scraperType}...`);

        // @ts-ignore
        const pageResult: ListingResult|null = await page.evaluate(({ pageFunctionCode }) => eval(pageFunctionCode), { pageFunctionCode });
        const html = await page.evaluate(() => document.getElementsByTagName('html')[0].innerHTML);
        const debugLink = saveData ? await Utils.saveHtml(html) : null;

        const duration = (new Date().getTime() - startedAt.getTime()) / 1000;
        console.log(`Finished : ${targetUrl} after ${duration}s`);

        return {
            url: targetUrl,
            debugLink: debugLink,
            duration: duration,
            error: pageResult ? null : 'Na stránce se nepodařilo nalézt hlavní HTML elementy.',
            listingResult: pageResult,
        };
    }

    async closeBrowser() : Promise<void> {
        console.log('Closing browser...');
        await this.browser.close();
    }
}