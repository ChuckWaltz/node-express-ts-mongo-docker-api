import { Request, Response } from "express";
import { MongooseDocument } from "mongoose";
import { Example } from "../models/example.model";

export class ExampleService {
  public getAllExample(req: Request, res: Response) {
    Example.find({}, (error: Error, example: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(example);
    });
  }

  public addNewExample(req: Request, res: Response) {
    const newExample = new Example(req.body);
    newExample.save((error: Error, example: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(example);
    });
  }

  public deleteExample(req: Request, res: Response) {
    const exampleId = req.params.id;
    Example.findByIdAndDelete(exampleId, (error: Error, deleted: any) => {
      if (error) {
        res.send(error);
      }
      const message = deleted
        ? `Deleted Successfully: ${deleted}`
        : "Example not found.";
      res.send(message);
    });
  }

  public updateExample(req: Request, res: Response) {
    const exampleId = req.params.id;
    Example.findByIdAndUpdate(
      exampleId,
      req.body,
      { new: true },
      (error: Error, example: any) => {
        if (error) {
          res.send(error);
        }
        const message = example
          ? `Updated successfully: ${example}`
          : "Example not found.";
        res.send(message);
      }
    );
  }
}
