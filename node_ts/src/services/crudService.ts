import * as mongoose from 'mongoose';
import { User } from '../model/user'
const user = mongoose.model("User", User)

export class CrudService {

    public createUser(data, callback) {
        console.log(data);
        const userobject = {
            username: data.username || '',
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            dob: data.dob || '',
            address: data.address || '',
            phone: data.phone || '',
            role: data.role || ''
        };
        console.log(userobject);
        let newUser =new user(userobject)
        console.log(newUser);
        newUser.save().then((response) => {
            callback(null, response);
        },(error) => {
            callback(error, null);
        }
        );
    }

    public findUser(query, callback) {
        user.find(query).then((response) =>{
            callback(response);
        })
    }

    public updateUser(query, data, options, callback) {
        user.findOneAndUpdate(query, data, options, (err, response) => {
            callback(err, response);
        });
        // user.save().then((response) => {
        //     callback(null, response);
        // },(error) => {
        //     callback(error, null);
        // });
    }

    public deleteUser(query, callback) {
        console.log("query", query);
        user.deleteOne(query).then((response) => {
            callback(response);
        }),(error) =>{
            callback(error);
        }
    }
}