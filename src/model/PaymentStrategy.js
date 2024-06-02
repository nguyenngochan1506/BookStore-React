class Payment{
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
    pay(price){}
}

export class CashPayment extends Payment{
    constructor(name, description){
        super(name, description)
    }
    pay(price){
        return {
            name: this.name,
            description: this.description,
            price: 0,
            discountPercent: 0
        };
    }
}
export class CartPayment extends Payment{
    constructor(name, description){
        super(name, description)
    }
    pay(price){
        return {
            name: this.name,
            description: this.description,
            price: price*0.05,
            discountPercent: 0.05
        };
    }
}

export const enumPayment = {
    CART: new CartPayment('Thanh Toán Chuyển Khoản','Bạn được giảm thêm 5% do thanh toán qua ATM'),
    CASH: new CashPayment('Thanh Toán Tiền Mặt')
}