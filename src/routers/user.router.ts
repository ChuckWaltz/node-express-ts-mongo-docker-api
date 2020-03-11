import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRouter {
  private userController: UserController;

  constructor(private router: Router) {
    this.userController = new UserController();

    // Set up routes
    this.router.route("/user").post(this.userController.addUser);
    this.router.route("/userAuth").post(this.userController.userAuth);
  }
}
