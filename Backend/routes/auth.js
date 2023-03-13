const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Piyushistryingauthentication";
const fetchuser = require("../middleware/fetchuser");

//Route 1: Endpoint to create a user , login not required
router.post(
  "/createuser", //End point

  //Code for validation (using express validator) , in below array
  [
    body("name", "Name must be of 3 characters").isLength({ min: 3 }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be of 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //if user with same email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: "Sorry the user with the given email already exists",
        });
      }

      //Hashing the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);

      //Creating the user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });

      //Creating the authentication token by using the id of the user by JWT
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.send({ authToken }); // It means {authToken : authToken}
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured while creating an user");
    }
  }
);

//Route 2: End point to login a user, login not required
router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //If there are errors return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; //Destructuring (email = req.body.email)
    try {
      let user = await User.findOne({ email: email });
      //If the user with same email does't exists
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password); // It returns true or false
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.send({ authToken }); // It means {authToken : authToken}
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3: Getting logedin user details, login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
