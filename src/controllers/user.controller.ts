import { Request, Response } from "express";
import APIResponse from "../objects/APIResponse";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

export class UserController {
  // @desc    Add user
  // @route   POST /api/user
  // @access  Public
  public async addUser(req: Request, res: Response) {
    let response = new APIResponse();

    try {
      const { name, email, password } = req.body;

      // Simple validation
      if (!name || !email || !password) {
        response.message = `Name, Email, and Password fields are required`;
        return res.status(400).json(response);
      }

      // Check for existing User
      const exists = await User.findOne({ email });
      if (exists) {
        response.message = `User already exists`;
        return res.status(400).json(response);
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

      response.success = true;
      response.message = `User added successfully`;
      response.payload = {
        token,
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email
        }
      };
      return res.status(200).json(response);
    } catch (err) {
      response.message = `Server Error: ${err}`;
      return res.status(500).json(response);
    }
  }

  // @desc    Authenticate user
  // @route   POST /api/user/login
  // @access  Public
  public async loginUser(req: Request, res: Response) {
    let response = new APIResponse();
    try {
      const { email, password } = req.body;

      // Simple validation
      if (!email || !password) {
        response.message = `Email, and Password fields are required`;
        return res.status(400).json(response);
      }

      // Check if user exists
      const existingUser: any = await User.findOne({ email });
      if (!existingUser) {
        response.message = `User does not exist`;
        return res.status(400).json(response);
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        response.message = `Invalid password`;
        return res.status(400).json(response);
      }

      const token = await jwt.sign(
        { id: existingUser.id },
        process.env.JWT_SECRET as Secret,
        { expiresIn: 3600 }
      );

      response.success = true;
      response.message = "User authorized successfully";
      response.payload = {
        token,
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email
        }
      };
      return res.status(200).json(response);
    } catch (err) {
      response.message = `Server Error: ${err}`;
      return res.status(500).json(response);
    }
  }

  // @desc    Get user data
  // @route   GET /api/user/auth
  // @access  Private
  public async authUser(req: Request, res: Response) {
    let response = new APIResponse();
    try {
      const { id } = req.user;

      const user = await User.findById(id).select("-password");

      if (!user) {
        response.message = `Unable to authenticate user.`;
        return res.status(400).json(response);
      }

      response.success = true;
      response.message = `User authenticated.`;
      response.payload = user;
      return res.status(200).json(response);
    } catch (err) {
      response.message = `Server Error: ${err}`;
      return res.status(500).json(response);
    }
  }
}
