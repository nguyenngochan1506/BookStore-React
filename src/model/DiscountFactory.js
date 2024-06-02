 class Discount{
    #discountCode
    #remaining
    constructor(discountCode, remaining) {
        this.#discountCode = discountCode;
        this.#remaining = remaining;
    }
    applyDiscount(code, price){}
    isValidDiscount(code){
        if(this.#discountCode.toUpperCase() != code.toUpperCase()){
            throw new Error('Mã giảm giá không đúng!')
        }
        if(this.#remaining <=0){
            throw new Error('Mã giảm giá đã hết lượt sử dụng!')
        }
        this.#remaining--; //giảm số lượng khi đã áp dụng
        return true;
    }
    getRemaining(){
        return this.#remaining;
    }
}
export class MixiDiscount extends Discount{
    constructor(discountCode, remaining) {
        super(discountCode, remaining)
    }
    applyDiscount(code, price){
        this.isValidDiscount(code);
        return {
            discountPrice: (price*0.1),
            percentDiscount: 0.1
        };
    }
}
export class ThayBaDiscount extends Discount{
    constructor(discountCode, remaining) {
        super(discountCode, remaining)
    }
    applyDiscount(code, price){
        this.isValidDiscount(code);
        return {
            discountPrice: (price*0.05),
            percentDiscount: 0.05
        };
    }
}



export class DiscountFactory{
    getDiscount(discountCode){
       const [type, code] = discountCode.split('-');
       const discount = discountType[type.toUpperCase()];
       if(!discount){
           throw Error('Mã giảm giá không tồn tại!')
       }
       return discount;
   }
}


const discountType = {
    THAYBA: new ThayBaDiscount('ThayBa-111',  0),
    MIXI: new MixiDiscount('Mixi-000', 10),
 }