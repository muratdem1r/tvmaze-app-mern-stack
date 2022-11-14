const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

// UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id) {
    if (req.body.password) {
      const encryptedPassword = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
      req.body.password = encryptedPassword;
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});

// DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});

// GET
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;

    res.status(200).json({ ...info });
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
