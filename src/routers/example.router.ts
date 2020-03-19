import { Router } from "express";
import { ExampleController } from "../controllers/example.controller";
import auth from "../middleware/auth";

export class ExampleRouter {
  private exampleController: ExampleController;

  constructor(private router: Router) {
    this.exampleController = new ExampleController();

    // Set up routes
    this.router.get("/example", auth, this.exampleController.getExamples);

    this.router.post("/example", auth, this.exampleController.addExample);

    this.router.delete(
      "/example/:id",
      auth,
      this.exampleController.deleteExample
    );

    this.router.post(
      "/example/:id",
      auth,
      this.exampleController.updateExample
    );
  }
}
