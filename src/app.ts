import express, { Application, Router } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MONGO_URL } from "./constants/api.constants";

import { ExampleController } from "./controllers/example.controller";

class App {
  public app: Application;
  private router: Router;

  public exampleController: ExampleController;

  constructor() {
    this.app = express();
    this.router = express.Router();

    this.setConfig();
    this.setMongoConfig();

    // Set base route for router
    this.app.use("/api", this.router);

    // Initialize controllers
    this.exampleController = new ExampleController(this.app, this.router);

    // Welcome message for root
    this.app.use("/", (req, res) => {
      res.status(200).send("Welcome!");
    });
  }

  private setConfig() {
    //Allows us to receive requests with data in json format
    this.app.use(express.json());

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));

    //Enables cors
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  }
}

export default new App().app;
