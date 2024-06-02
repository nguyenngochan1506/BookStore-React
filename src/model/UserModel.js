export default class UserModel{
    constructor(userName, password, fullName, email, genre, phoneNumber, address) {
        this.userName = userName;
        this.password = password;
        this.fullName = fullName;
        this.email = email;
        this.genre = genre;
        this.phoneNumber = phoneNumber;
        this.address = address; 
        this.createDate = new Date();
        this.updatedDate = new Date();
        this.isActive = true;
        this.avatar = '';
        this.listBookFavorite = [];
        this.listAuthorFavorite = [];
        this.listOrder = [];
        this.listRole =  [];
        this.listNotify = [];
    }
    updateNotify(notify){
        console.log(`${this.fullName} có 1 thông báo mới: ${notify.message}`);
        this.listNotify.push(notify);
    }
}