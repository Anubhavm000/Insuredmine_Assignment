const express = require('express');
const router = express.Router();
const {messageQueue} = require('../models/scheduleMsg.js');

router.post('/schedule', async (req, res) => {
  const { message, day, time } = req.body;

  if (!message || !day || !time) {
    return res.status(400).json({ errorMsg: "Message, day and time are required" });
  }

  const dateTime = new Date(`${day}T${time}:00`);
  if (isNaN(dateTime.getTime())) {
    return res.status(400).json({ error: 'Invalid date/time format' });
  }

  try {
    const scheduled = await messageQueue.create({
      message,
      scheduledFor: dateTime
    });

    res.json({ message: 'Message scheduled', data: scheduled });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;