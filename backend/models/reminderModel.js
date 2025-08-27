import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  dateTime: { type: Date, required: true }
}, { timestamps: true });

const Reminder = mongoose.model('Reminder', reminderSchema);
export default Reminder;