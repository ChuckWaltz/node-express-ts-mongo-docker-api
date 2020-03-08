import { Application, Router } from "express";
import { ExampleService } from "../services/example.service";

export class ExampleController {
  private exampleService: ExampleService;

  constructor(private app: Application, private router: Router) {
    this.exampleService = new ExampleService();

    // Set up routes
    this.router.route("/examples").get(this.exampleService.getExamples);
    this.router.route("/example").post(this.exampleService.addExample);
    this.router
      .route("/example/:id")
      .delete(this.exampleService.deleteExample)
      .post(this.exampleService.updateExample);
  }
}
