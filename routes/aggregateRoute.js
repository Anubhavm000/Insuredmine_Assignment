const express = require('express');
const router = express.Router();
const {Policy} = require('../models/models');

router.get('/aggregate', async (req, res) => {
  try {
    const result = await Policy.aggregate([
      {
        $group: {
          _id: '$user', 
          totalPolicies: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'users', 
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $project: {
          _id: 0,
          userId: '$userDetails._id',
          firstName: '$userDetails.firstName',
          email: '$userDetails.email',
          totalPolicies: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


module.exports = router