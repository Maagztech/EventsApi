import { Schema, model } from 'mongoose';
const eventSchema = new Schema({
  admin: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  title: { type: String, required: true },
  description: { type: String },
  image: [{ type: String, default: 'https://via.placeholder.com/150' }],
  date: { type: Date },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  seats: { type: Number, required: true },
  category: [{ type: String, required: true }],
  registeredCount: { type: Number, default: 0 },
});
export default model('Event', eventSchema);
