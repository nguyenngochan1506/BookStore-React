import { DiscountFactory } from "../model";


export const applyDiscount = (code, price) =>{
    const factory = new DiscountFactory();
    const discount = factory.getDiscount(code);
    return discount.applyDiscount(code, price)
}