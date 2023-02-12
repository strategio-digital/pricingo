import {ListingResult} from "./ListingResult";

export type ComparatorResult = {
    url: string|null;
    debugLink: string|null;
    duration: number|null;
    error: string|null
    listingResult: ListingResult|null
}