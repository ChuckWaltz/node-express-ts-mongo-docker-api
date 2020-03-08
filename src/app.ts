import express, { Application, Router } from "express";
import { resolve } from "path";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import { ExampleRoutes } from "./routes/example.routes";

class App {
  public app: Application;
  private router: Router;

  public exampleRoutes: ExampleRoutes;

  constructor() {
    this.app = express();
    this.router = express.Router();

    this.setConfig();
    this.setMongoConfig();

    // Set base route for router
    this.app.use("/api", this.router);

    // Initialize routes
    this.exampleRoutes = new ExampleRoutes(this.router);

    // Welcome message for root
    this.app.use("/", (req, res) => {
      res.status(200).send("Welcome!");
    });
  }

  private setConfig() {
    //Load environment variables w/ dotenv
    config({ path: resolve(__dirname, "./config/.env") });

    //Allows us to receive requests with data in json format
    this.app.use(express.json());

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));

    //Enables cors
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  }
}

export default new App().app;
