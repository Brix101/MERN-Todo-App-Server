const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.post("/register", async (req, res) => {
try{
    const { name, email,password, passwordVerify } = req.body;

  const alreadyExistsUser = await User.findOne({ email }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User with email already exists!" });
  }

  if (password !== passwordVerify)
  return res.status(409).json({
    errorMessage: "Please enter the same password twice.",
  });

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // save a new user account to the db

  const newUser = new User({ name, email, passwordHash });

  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });

  const token = jwt.sign(
    {
      user: savedUser._id,
    },
    process.env.JWT_SECRET
  );
  if (savedUser)
    res.cookie("token", token, {
      httpOnly: true
    }).send();

} catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
