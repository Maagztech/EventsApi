import { Schema, model } from 'mongoose';
const adminSchema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    refresh_token: { type: String },
    role: { type: String, default: 'admin' },
});
export default model('Admin', adminSchema);
