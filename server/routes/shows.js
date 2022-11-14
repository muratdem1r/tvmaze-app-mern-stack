const router = require("express").Router();
const User = require("../models/User");
const verify = require("../verifyToken");

// LIKE
router.get("/:user/:show/like", verify, async (req, res) => {
  if (req.user.id === req.params.user) {
    try {
      const user = await User.findById(req.params.user);
      if (user.likes.includes(req.params.show)) {
        return res.status(403).json("You have already liked!");
      }
      user.likes.push(req.params.show);
      await user.save();
      return res.status(200).json("Like successfull!");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can do this with only your account!");
  }
});

// DISLIKE
router.get("/:user/:show/dislike", verify, async (req, res) => {
  if (req.user.id === req.params.user) {
    try {
      const user = await User.findById(req.params.user);
      if (user.dislikes.includes(req.params.show)) {
        return res.status(403).json("You have already disliked!");
      }
      user.dislikes.push(req.params.show);
      await user.save();
      return res.status(200).json("Dislike successfull!");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can do this with only your account!");
  }
});

// UNDO
router.get("/:user/:show/undo", verify, async (req, res) => {
  if (req.user.id === req.params.user) {
    try {
      const user = await User.findById(req.params.user);

      user.likes.remove(req.params.show);
      user.dislikes.remove(req.params.show);

      await user.save();
      return res.status(200).json("Successfull!");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can do this with only your account!");
  }
});

// ADD LIST
router.get("/:user/:show/addlist", verify, async (req, res) => {
  if (req.user.id === req.params.user) {
    try {
      const user = await User.findById(req.params.user);
      if (user.showList.includes(req.params.show)) {
        return res.status(403).json("You have already added!");
      }

      user.showList.push(req.params.show);
      await user.save();

      return res.status(200).json("Successfull!");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can do this with only your account!");
  }
});

// REMOVE LIST
router.get("/:user/:show/removelist", verify, async (req, res) => {
  if (req.user.id === req.params.user) {
    try {
      const user = await User.findById(req.params.user);

      user.showList.remove(req.params.show);

      await user.save();
      return res.status(200).json("Successfull!");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can do this with only your account!");
  }
});

module.exports = router;
