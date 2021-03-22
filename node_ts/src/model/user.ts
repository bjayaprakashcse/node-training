import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const User = new Schema({
    username: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    dob: String,
    address: String,
    phone: String,
    role: String
});
