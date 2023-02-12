/**
 * Copyright (c) 2021 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
import {ListingResult} from "../types/ListingResult";
import {Shop} from "../types/Shop";
import {IListing} from "./IListing";

enum ExtractorType {
    // Be careful, value must be same as method name
    'hr2021' = 'heureka_listing_2021',
    'hr2020' = 'heureka_listing_2020'
}

//@ts-ignore
class HeurekaListing implements IListing {
    execute($: any): ListingResult|null {
        for (const index in ExtractorType) {
            // @ts-ignore
            const result = this[ExtractorType[index]]($);
            if (result) return result;
        }

        return null;
    }

    heureka_listing_2021($: any): ListingResult|null {
        const $jsOffer = $('.js-offer');
        const $section = $('section[data-fold-id="offer_list.index"]');

        if ($section.length === 0 || $jsOffer.length === 0) {
            return null;
        }

        const shops: Array<Shop> = [];

        $jsOffer.each((index: number, element: any) => {
            const $root = $(element);
            shops.push({
                name: $root.find('[data-gtm-element-type="logo"] img').attr("alt").trim(),
                link: $root.find('[data-gtm-element-type="logo"]').attr('href'),
                inStock: $root.find(".c-offer-v3__delivery-availability > span:eq(1)").text().trim(),
                productPrice: { // TODO: extract price & currency
                    value: $root.find(".c-offer-v3__price").text().trim(),
                    currency: ''
                },
                deliveryPrice: { // TODO: extract price & currency
                    value: $root.find(".c-offer-v3__delivery-availability > span:eq(0)").text().trim(),
                    currency: ''
                }
            });
        });

        return {
            extractorName: ExtractorType.hr2021,
            productName: $("h1").text().trim(),
            image: $("a.gtm-header-link").find("img").attr("src"),
            shops: shops
        };
    }

    heureka_listing_2020($: any): ListingResult|null {
        const $content = $('#content');
        const $shops = $('#online-shops .shoppr');

        if ($shops.length === 0 || $content.length === 0) {
            return null;
        }

        const shops: Array<Shop> = [];

        $shops.each((index: number, element: any) => {
            const $root = $(element);
            shops.push({
                name: $root.find('.shop-name').text().trim(),
                link: $root.find('.shop-name a').attr('href'),
                inStock: $root.find('.delivery-info .dotted').text().trim(),
                productPrice: { // TODO: extract price & currency
                    value: $root.find('a.pricen').text(),
                    currency: ''
                },
                deliveryPrice: { // TODO: extract price & currency
                    value: $root.find('.delivery .dotted').text().trim(),
                    currency: ''
                }
            });
        });

        return {
            extractorName: ExtractorType.hr2020,
            productName: $content.find('h1').text().trim(),
            image: $content.find('.foto img').attr('src'),
            shops: shops
        };
    }
}