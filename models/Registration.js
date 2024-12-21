import { Schema, model } from 'mongoose';
const registrationSchema = new Schema({
  admin: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  registrationDate: { type: Date, default: Date.now },
});
export default model('Registration', registrationSchema);
