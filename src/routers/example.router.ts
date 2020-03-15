import { Router } from "express";
import { ExampleController } from "../controllers/example.controller";
import auth from "../middleware/auth";

export class ExampleRouter {
  private exampleController: ExampleController;

  constructor(private router: Router) {
    this.exampleController = new ExampleController();

    // Set up routes
    this.router.route("/examples").get(this.exampleController.getExamples);

    this.router
      //.use(auth)
      .route("/example")
      .post(this.exampleController.addExample);
    this.router
      //.use(auth)
      .route("/example/:id")
      .delete(this.exampleController.deleteExample)
      .post(this.exampleController.updateExample);
  }
}
