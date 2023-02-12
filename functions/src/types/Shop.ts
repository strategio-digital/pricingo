import {Price} from "./Price";

export type Shop = {
    deliveryPrice: Price;
    productPrice: Price;
    inStock: string;
    name: string;
    link: string;
}