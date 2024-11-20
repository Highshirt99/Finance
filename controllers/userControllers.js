import { User } from "../models/User.js";

// Register user

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      if (user) {
        // return res.status(400).json({ message: "User has already registered" });
        throw new Error("User already exists.");
      }
    }
    // Create a new user
    user = new User({ name, email, password });

    // Save the user to the database
    await user.save();

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Account created successfully.",
      token: user.getSignedToken(),
    });
  } catch (error) {
   next(error)
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email not found");
    }

    // Check if the password is correct
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password.",
      });
    }

    if (isMatch) {
      return res.status(200).json({
        message: "Login successful.",
        _id: user._id,
        name: user.name,
        email: user.email,
        token: user.getSignedToken(),
      });
    } else {
      throw new Error ("Invalid credentials.")
    }
  } catch (error) {
next(error)
  }
};
