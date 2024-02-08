import {Users} from '../persistence/userManager.js';

const usersManagerDB = new Users();

class UserService{
    static getAll = async () => {
        const result = usersManagerDB.getAll();
        return result;
    }

    static getBy = async(params) => {
        const result = usersManagerDB.getBy(params);
        return result;
    }

    static saveUser = async(user) => {
        const result = usersManagerDB.saveUser(user);
        return result;
    }

    static updateUser = async(id,user) => {
        const result = usersManagerDB.updateUser(id,user);
        return result;
    }
}

export {UserService};