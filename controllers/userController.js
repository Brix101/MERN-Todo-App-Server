const jwt = require("jsonwebtoken");
const User = require('../models/userModel')


exports.logout = (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
      })
      .send();
  };

exports.loggedIn = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
  } catch (err) {
    res.json(false);
  }
};

