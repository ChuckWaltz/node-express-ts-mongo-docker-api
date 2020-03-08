import { Router } from "express";
import { ExampleController } from "../controllers/example.controller";

export class ExampleRoutes {
  private exampleService: ExampleController;

  constructor(private router: Router) {
    this.exampleService = new ExampleController();

    // Set up routes
    this.router.route("/examples").get(this.exampleService.getExamples);
    this.router.route("/example").post(this.exampleService.addExample);
    this.router
      .route("/example/:id")
      .delete(this.exampleService.deleteExample)
      .post(this.exampleService.updateExample);
  }
}
