const cron = require('node-cron');
const {messageQueue,messageScheduler} = require('../models/scheduleMsg');

cron.schedule('* * * * *', async () => {
  const now = new Date();

  try {
    const dueMessages = await messageQueue.find({
      scheduledFor: { $lte: now }
    });

    for (const job of dueMessages) {
      await messageScheduler.create({
        message: job.message,
        status: 'posted',
        scheduledFor: job.scheduledFor,
      });

      await messageQueue.deleteOne({ _id: job._id });

      console.log(`Posted message at ${new Date().toLocaleTimeString()}: ${job.message}`);
    }
  } catch (err) {
    console.error('Error in cron job:', err);
  }
});