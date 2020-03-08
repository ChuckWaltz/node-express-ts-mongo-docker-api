import { Router } from "express";
import { ExampleController } from "../controllers/example.controller";

export class ExampleRouter {
  private exampleController: ExampleController;

  constructor(private router: Router) {
    this.exampleController = new ExampleController();

    // Set up routes
    this.router.route("/examples").get(this.exampleController.getExamples);
    this.router.route("/example").post(this.exampleController.addExample);
    this.router
      .route("/example/:id")
      .delete(this.exampleController.deleteExample)
      .post(this.exampleController.updateExample);
  }
}
