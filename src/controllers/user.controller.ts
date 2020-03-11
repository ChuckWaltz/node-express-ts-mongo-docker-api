import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

export class UserController {
  // @desc    Add user
  // @route   POST /api/user
  // @access  Public
  public async addUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Simple validation
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          error: `Name, Email, and Password fields are required.`
        });
      }

      // Check for existing User
      const exists = await User.findOne({ email });
      if (exists) {
        return res
          .status(400)
          .json({ success: false, error: `User already exists.` });
      }

      const newUser: any = new User({ name, email, password });

      // Create salt & hash
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;

      const savedUser = await newUser.save();

      const token = await jwt.sign(
        { id: savedUser.id },
        process.env.JWT_SECRET as Secret,
        { expiresIn: 3600 }
      );

      return res.status(200).json({
        token,
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email
        }
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: `Server Error: ${err}`
      });
    }
  }

  // @desc    Authenticate user
  // @route   POST /api/userAuth
  // @access  Public
  public async userAuth(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Simple validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: `Email, and Password fields are required.`
        });
      }

      // Check if user exists
      const existingUser: any = await User.findOne({ email });
      if (!existingUser) {
        return res
          .status(400)
          .json({ success: false, error: `User does not exist.` });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ success: false, error: `Invalid password.` });

      const token = await jwt.sign(
        { id: existingUser.id },
        process.env.JWT_SECRET as Secret,
        { expiresIn: 3600 }
      );

      return res.status(200).json({
        token,
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email
        }
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: `Server Error: ${err}`
      });
    }
  }
}
