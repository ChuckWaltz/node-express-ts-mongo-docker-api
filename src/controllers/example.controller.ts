import { Request, Response } from "express";
import APIResponse from "../objects/APIResponse";
import { Example } from "../models/example.model";

export class ExampleController {
  // @desc    Get all examples
  // @route   GET /api/examples
  // @access  Public
  public async getExamples(req: Request, res: Response) {
    let response = new APIResponse();

    try {
      const examples = await Example.find();

      response.success = true;
      response.message = `Examples returned successfully`;
      response.payload = { count: examples.length, examples };
      return res.status(200).json(response);
    } catch (err) {
      response.message = `Server Error: ${err}`;
      return res.status(500).json(response);
    }
  }

  // @desc    Add example
  // @route   POST /api/example
  // @access  Public
  public async addExample(req: Request, res: Response) {
    let response = new APIResponse();

    try {
      const newExample = await Example.create(req.body);

      response.success = true;
      response.message = `Example added successfully`;
      response.payload = newExample;
      return res.status(201).json(response);
    } catch (err) {
      if (err.name === "ValidationError") {
        // Pull out the error messages from the errors within err to display to user
        const messages = Object.values(err.errors).map(
          (val: any) => val.message
        );

        response.message = err.name;
        response.payload = messages;
        return res.status(400).json(response);
      } else {
        response.message = `Server Error: ${err}`;
        return res.status(500).json(response);
      }
    }
  }

  // @desc    Delete example
  // @route   DELETE /api/example/:id
  // @access  Public
  public async deleteExample(req: Request, res: Response) {
    let response = new APIResponse();

    try {
      const example = await Example.findById(req.params.id);

      if (!example) {
        response.message = `No example found with ID: ${req.params.id}`;
        return res.status(404).json(response);
      }

      await example.remove();

      response.success = true;
      response.message = `Example deleted successfully`;
      response.payload = example;
      return res.status(200).json(response);
    } catch (err) {
      response.message = `Server Error: ${err}`;
      return res.status(500).json(response);
    }
  }

  // @desc    Update example
  // @route   POST /api/example/:id
  // @access  Public
  public async updateExample(req: Request, res: Response) {
    let response = new APIResponse();

    try {
      const example = await Example.findById(req.params.id);

      if (!example) {
        response.message = `No example found with ID: ${req.params.id}`;
        return res.status(404).json(response);
      }

      await example.updateOne(req.body, { new: true });

      const updated = await Example.findById(req.params.id);

      response.success = true;
      response.message = `Example updated successfully`;
      response.payload = updated;
      return res.status(200).json(response);
    } catch (err) {
      response.message = `Server Error: ${err}`;
      return res.status(500).json(response);
    }
  }
}
