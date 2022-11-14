const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  // Check email conflict
  let user = await User.findOne({ email: req.body.email });
  if (user !== null) return res.status(409).send("Email already exists.");

  // Check username conflict
  user = await User.findOne({ username: req.body.username });
  if (user !== null) return res.status(409).send("Username already exists.");

  // Encrypt password
  const encryptedPassword = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.SECRET_KEY
  ).toString();

  // Create new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: encryptedPassword,
  });

  // Save user to database
  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("Wrong password or username!");
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong password or username!");
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "365d",
    });

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
