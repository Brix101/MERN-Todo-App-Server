const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.post("/login", async (req, res) => {
  try{
    const { email, password } = req.body;

    const userWithEmail = await User.findOne({ email });

    if (!userWithEmail)
      return res.status(409).json({ message: "Email or password does not match!" });

    const passwordCorrect = await bcrypt.compare(
      password,
      userWithEmail.passwordHash
    );

    if (!passwordCorrect)
      return res.status(409).json({ message: "password does not match!" });


    const token = jwt.sign(
      {  user: userWithEmail._id, },
      process.env.JWT_SECRET
    );
   
    // send the token in a HTTP-only cookie

    res.cookie("token", token, {
      httpOnly: true
    })
    .send({token});

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});



module.exports = router;
