import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import Puppeteer from "./scraper/puppeteer";
import {ComparatorResult} from "./types/ComparatorResult";
import {CallableContext} from "firebase-functions/lib/providers/https";
import {AllowedTypes} from "./types/ScraperType";

admin.initializeApp();

// Todo: proxy
// Todo: cluster
// Todo: getLinks from queue
export const runPuppeteer = functions
    .region('europe-west3')
    .runWith({ timeoutSeconds: 120, memory: '4GB', failurePolicy: false }) // Failure policy is not supported on HTTP functions
    .https.onCall(async (data: any, context: CallableContext): Promise<Array<ComparatorResult>> => {
        const comparatorResults: Array<ComparatorResult> = [];
        const links = data.links.filter((item: string, index: number, self:string) => self.indexOf(item) === index).splice(0, 10);

        if (!AllowedTypes.includes(data.scraperType)) {
            comparatorResults.push({ error: `Scraper typu '${data.scraperType} neexistuje.'`, url: null, duration: null, listingResult: null, debugLink: null });
            return comparatorResults;
        }

        const scraper = new Puppeteer(data.scraperType, true, null, 1500);
        await scraper.createBrowser(1920, 1080);

        for (const targetUrl of links) {
            try {
                const comparatorResult = await scraper.getPageResult(targetUrl);
                comparatorResults.push(comparatorResult);
            } catch (exception) {
                comparatorResults.push({ error: exception.message, url: targetUrl, duration: null, listingResult: null, debugLink: null });
            }
        }

        await scraper.closeBrowser();

        return comparatorResults;
});
