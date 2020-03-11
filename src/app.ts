import express, { Application, Router } from "express";
import { resolve } from "path";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import { ExampleRouter } from "./routers/example.router";
import { UserRouter } from "./routers/user.router";

class App {
  public app: Application;
  private router: Router;

  public exampleRouter: ExampleRouter;
  public userRouter: UserRouter;

  constructor() {
    this.app = express();
    this.router = express.Router();

    this.setConfig();
    this.setMongoConfig();

    // Set base route for router
    this.app.use("/api", this.router);

    // Initialize routers
    this.exampleRouter = new ExampleRouter(this.router);
    this.userRouter = new UserRouter(this.router);

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
      useFindAndModify: false,
      useCreateIndex: true
    });
  }
}

export default new App().app;
