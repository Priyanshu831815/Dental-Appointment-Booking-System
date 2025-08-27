import Reminder from '../models/reminderModel.js';
import { sendReminderEmail } from '../utils/email.js';
import schedule from 'node-schedule';

export const getReminders = async (req, res) => {
  try {
    // Debug: log what req.user is
    console.log("req.user in getReminders:", req.user);

    const reminders = await Reminder.find({ userId: req.user.id }).sort({ dateTime: 1 });
    res.json(reminders);
  } catch (err) {
    console.error("Error in getReminders:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addReminder = async (req, res) => {
  try {
    console.log("req.user in ADD:", req.user);
    const { medicineName, dateTime } = req.body;
    if (!medicineName || !dateTime) {
      return res.status(400).json({ error: 'medicineName and dateTime are required' });
    }
    const userId = req.user.id;

    const reminder = new Reminder({
      medicineName,
      dateTime,
      userId
    });
    await reminder.save();

    // --- Send reminder email to the authenticated user ---
    const scheduledDate = new Date(dateTime);
    schedule.scheduleJob(reminder._id.toString(), scheduledDate, async function () {
      await sendReminderEmail({
        to: req.user.email, // <-- FIXED!
        medicineName,
        dateTime
      });
    });

    res.status(201).json(reminder);
  } catch (err) {
    console.error('addReminder error:', err); // Always log for debugging
    res.status(500).json({ error: 'Server error' });
  }
};