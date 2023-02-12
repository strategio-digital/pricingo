import {Shop} from "./Shop";

export type ListingResult = {
    extractorName: string|null
    image: string;
    productName: string;
    shops: Array<Shop>;
}