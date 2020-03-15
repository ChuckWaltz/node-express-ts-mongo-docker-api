import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import auth from "../middleware/auth";

export class UserRouter {
  private userController: UserController;

  constructor(private router: Router) {
    this.userController = new UserController();

    // Set up routes
    this.router.post("/user", this.userController.addUser);
    this.router.post("/user/login", this.userController.loginUser);
    this.router.get("/user/auth", auth, this.userController.authUser);
  }
}
