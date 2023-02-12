import {ListingResult} from "../types/ListingResult";

export interface IListing {
    execute($: any): ListingResult|null;
}