import dayjs from "dayjs"
import OrderModel from "./OrderModel"

class OrderState{
    constructor(name) {
        this.name = name;
    }
    handlePay(){
        throw new Error('Thao tác không hợp lệ, vui lòng thử lại sau!!!')
    }
    handleCancel(){
        throw new Error('Thao tác không hợp lệ, vui lòng thử lại sau!!!')
    }
    handleConfirm(){
        throw new Error('Thao tác không hợp lệ, vui lòng thử lại sau!!!')
    }
    handleDelivered(){
        throw new Error('Thao tác không hợp lệ, vui lòng thử lại sau!!!')
    }
    handleComplete(){
        throw new Error('Thao tác không hợp lệ, vui lòng thử lại sau!!!')
    }
    handleNotComplete(){
        throw new Error('Thao tác không hợp lệ, vui lòng thử lại sau!!!')
    }
    handleReturn(){
        throw new Error('Thao tác không hợp lệ, vui lòng thử lại sau!!!')
    }
}


class New extends OrderState{
    constructor() {
        super('Mới Tạo')
    }
    handlePay(){
        return {
            newState: new Paid(),
            message: 'Thanh toán thành công, đơn hàng sẽ được sớm giao đến bạn'
        };
    }
    handleCancel(){
        return {
            newState: new Cancelled(),
            message: 'Huỷ thành công!'
        };
    }
}
export class Paid extends OrderState{
    constructor() {
        super('Đã Thanh Toán')
    }
    handleConfirm(){
        return {
            newState: new Confirm(),
            message: 'Đơn hàng đã được xác nhận!'
        }
    }
}
export class Return extends OrderState{
    constructor() {
        super('Đơn Hàng sẽ được hoàn trả!')
    }
    handleReturn(){
        return {
            newState: new Cancelled(),
            message: 'Huỷ đơn hàng!'
        }
    }
}
export class NotComplete extends OrderState{
    constructor() {
        super('Giao Hàng Không Thành Công')
    }
    handleReturn(){
        return {
            newState: new Return(),
            message: 'Đơn hàng sẽ được hoàn trả!'
        }
    }
}
export class Confirm extends OrderState{
    constructor() {
        super('Đã Xác Nhận')
    }
    handleDelivered(){
        return {
            newState: new Delivery(),
            message: 'Đơn hàng đang được giao...'
        }
    }
}
export class Delivery extends OrderState{
    constructor() {
        super('Đang Giao Hàng')
    }
    handleComplete(){
        return {
            newState: new Complete(),
            message:'Đơn hàng đã được giao thành công!'
        }
    }
    handleNotComplete(){
        return {
            newState: new NotComplete(),
            message:'Giao Hàng Thất Bại!'
        }
    }
}
class Complete extends OrderState{
    constructor() {
        super('Đã Nhận')
    }
}
class Cancelled extends OrderState{
    constructor() {
        super('Đã huỷ')
    }
}



export default class {
    constructor({id, shippingAddress, userInfo}) {
        this.userInfo = userInfo;
        this.createdDate = dayjs(new Date()).format('DD/MM/YYYY').toString();
        this.id = id;
        this.shippingAddress = shippingAddress;
        this.listOrderDetails = [];
        this.total = 0;
        this.state = new New();
    }
    updateState(state){
        this.state = state;
    }
    numOrderItems(){
        return this.listOrderDetails.length;
    }
    pay(){
        const {newState, message} = this.state.handlePay()
        this.updateState(newState)
        return message;
    }
    cancel(){
        const {newState, message} = this.state.handleCancel();
        this.updateState(newState)
        return message;
    }
    confirm(){
        const {newState, message} = this.state.handleConfirm();

        this.updateState(newState)
        return message;
    }
    delivery(){
        const {newState, message} = this.state.handleDelivered();

        this.updateState(newState)
        return message;
    }
    complete(){
        const {newState, message} = this.state.handleComplete();
        this.updateState(newState)
        return message;
    }
    static convertToOrderModel(obj){
        if(!obj) return null;
        const {id, listOrderDetails, shippingAddress, total, createdDate} = obj; 
        const order = new OrderModel({id, shippingAddress});
        order.listOrderDetails = listOrderDetails;
        order.createdDate = createdDate;
        order.total = total;
        return order;
    }
}