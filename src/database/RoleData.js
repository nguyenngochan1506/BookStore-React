import {RoleModel} from "../model"


const RoleData = {
    admin: new RoleModel('ADMIN'),
    user: new RoleModel('USER'),
    employee: new RoleModel('EMPLOYEE')
}
   

export default RoleData;