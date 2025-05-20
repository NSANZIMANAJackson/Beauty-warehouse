import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db/connection.js";
import { createCustomAPIError } from "../errors/customAPIerror.js";

const generateToken = async (name) => {
  return jwt.sign({ userName: name }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

const signup = async (req, res, next) => {
  try {
    const { user_name, password } = req.body;
    if (!user_name || !password) {
      return next(
        createCustomAPIError("Please enter username and password", 400)
      );
    }

    const [checkUsername] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [user_name]
    );

    if (checkUsername.length > 0) {
      return next(createCustomAPIError("Username already exists", 409));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query("INSERT INTO users(username, password) VALUES (?, ?)", [
      user_name,
      hashedPassword,
    ]);

    res.status(201).send("Account created successfully");
  } catch (error) {
    next(error); // Let error-handling middleware catch unexpected errors
  }
};

const login = async (req, res, next) => {
  try {
    const { user_name, password } = req.body;
    if (!user_name || !password) {
      return next(
        createCustomAPIError("Please enter username and password", 400)
      );
    }

    const [users] = await db.query(
      "SELECT username, password FROM users WHERE username = ?",
      [user_name]
    );

    if (users.length === 0) {
      return next(createCustomAPIError("Username invalid", 401));
    }

    const isPasswordValid = await bcrypt.compare(password, users[0].password);

    if (!isPasswordValid) {
      return next(createCustomAPIError("Password invalid", 401));
    }

    const token = await generateToken(user_name);
    res.status(200).json({msg:"Login successful", token });
  } catch (error) {
    next(error); // Pass actual error to middleware
  }
};

export { signup, login };
