import express from 'express';
import { getReminders, addReminder } from '../controllers/reminderController.js';
import authUser from '../middleware/authUser.js';

const router = express.Router();

router.get('/', authUser, getReminders);
router.post('/', authUser, addReminder);

export default router;