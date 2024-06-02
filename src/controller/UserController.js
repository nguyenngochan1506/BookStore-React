import { RoleData, UserData } from '../database'
import { UserModel } from "../model/index.js"


export const login = (userInfo) => {
    const userFromDatabase = UserData.find(user => user.userName == userInfo.userName);

    if (!userFromDatabase) throw new Error('Sai tên đăng nhập hoặc mật khẩu!');
    if (userInfo.password !== userFromDatabase.password) throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác!')

    const loginDate = new Date();
    return {
        user: {...userFromDatabase, createDate:userFromDatabase.createDate.toISOString() },
        loginDate: loginDate.toISOString()
    }
}

/**
 * kiểm tra người dùng có tồn tại trong hệ thống
 * @param {*} userInfo 
 * @returns 
 */
const isExits = (userInfo) => {
    //kiểm tra đã tồn tại
    const isExits = UserData.find(user => user.userName == userInfo.userName);
    if (isExits) {
        throw new Error('Tên Đăng Nhập Đã Tồn tại')
    }
    const isExits2 = UserData.find(user => user.email == userInfo.email);
    if (isExits2) {
        throw new Error('Email đã được sử dụng!')
    }
    return;
}
export const isExitsEmail = (email) =>{
    const isExits2 = UserData.find(user => user.email == email);
    if (isExits2) {
        throw new Error('Email đã được sử dụng!')
    }
    return;
}
export const updateUser = (newInfo) =>{
    const userFromDatabase = UserData.find(user => user.userName == newInfo.userName);
    userFromDatabase.fullName = newInfo.fullName;
    userFromDatabase.password = newInfo.password
    userFromDatabase.email = newInfo.email
    userFromDatabase.genre = newInfo.genre
    userFromDatabase.phoneNumber = newInfo.phoneNumber
    userFromDatabase.address = newInfo.address
    userFromDatabase.updatedDate = new Date();
    userFromDatabase.avatar = newInfo.avatar
    const user = {...userFromDatabase, createDate:userFromDatabase.createDate.toISOString() }
    return user;
    
}
/**
 * đăng ký
 * @param {} userInfo 
 * @returns 
 */
export const register = (userInfo) => {
    isExits(userInfo)

    const newUser = new UserModel(userInfo.userName,
        userInfo.password,
        userInfo.fullName,
        userInfo.email,
        userInfo.genre,
        userInfo.phoneNumber,
        userInfo.address);

    newUser.listRole.push(RoleData.user.name); //mặt định sẽ là user bình thường
    //lưu vào database
    UserData.push(newUser);
    return newUser
}

/**
 * data mặc định 
 */
const userInfo1 = {
    userName: 'test@gmail.com',
    password: '123',
    fullName: 'Nguyễn Ngọc Hân',
    email: 'test@gmail.com',
    genre: true,
    phoneNumber: '01234556',
    address: 'bình thuận'
}
const userInfo2 = {
    userName: 'user2',
    password: '123',
    fullName: 'Nguyễn Tèo',
    email: '1dđ23@gmail.com',
    genre: true,
    phoneNumber: '01234556',
    address: 'Bình Dương'
}
const userInfo3 = {
    userName: 'user3',
    password: '123',
    fullName: 'Nguyễn Ngọc Hân',
    email: '1235@gmail.com',
    genre: true,
    phoneNumber: '01234556',
    address: 'Hà Nội'
}
register(userInfo1)
register(userInfo2)
register(userInfo3)
