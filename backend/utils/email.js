
import { Resend } from 'resend';

const resend = new Resend(''); // <-- Replace with your API key

const sendReminderEmail = async ({ to, medicineName, dateTime }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'Test7235@gmail.com',
      subject: 'Your Medicine Reminder is Set!',
      html: `
        <p>Your reminder for <strong>${medicineName}</strong> has been set for <strong>${dateTime}</strong>.</p>
      `
    });
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
};
 
// ADD THIS FUNCTION:
const sendWelcomeEmail = async ({ to, name }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'Test7235@gmail.com',
      subject: 'Welcome to DentalFlow!',
      html: `
        <p>Hello <strong>${name}</strong>,</p>
        <p>Thank you for registering at DentalFlow! We're excited to have you with us.</p>
      `
    });
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
};

export { sendReminderEmail, sendWelcomeEmail };
