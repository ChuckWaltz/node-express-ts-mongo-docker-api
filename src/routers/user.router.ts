import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRouter {
  private userController: UserController;

  constructor(private router: Router) {
    this.userController = new UserController();

    // Set up routes
    this.router.post("/user", this.userController.addUser);
    this.router.post("/userAuth", this.userController.userAuth);
  }
}
