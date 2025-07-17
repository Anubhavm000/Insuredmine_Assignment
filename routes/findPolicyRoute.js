const express = require("express");
const router = express.Router();
const { User, Policy } = require("../models/models.js");
const { route } = require("./uploadRoute.js");

router.get("/search/:name", async (req, res) => {
  const { name } = req.params;
  // console.log(name)

  try {
    const user = await User.findOne({ firstName: name });
    if (!name) {
      return res.json({ error: "User does not exist" });
      // console.log(user);
    }
    const policies = await Policy.find({ user: user._id })
      .populate("user")
      .populate("category")
      .populate("carrier");
    return res.json({ user: user.firstName, policies });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
