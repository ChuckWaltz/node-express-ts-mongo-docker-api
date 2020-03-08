import { Request, Response } from "express";
import { Example } from "../models/example.model";

export class ExampleController {
  // @desc    Get all examples
  // @route   GET /api/examples
  // @access  Public
  public async getExamples(req: Request, res: Response) {
    try {
      const examples = await Example.find();

      return res.status(200).json({
        success: true,
        count: examples.length,
        data: examples
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: `Server Error: ${err}`
      });
    }
  }

  // @desc    Add example
  // @route   POST /api/example
  // @access  Public
  public async addExample(req: Request, res: Response) {
    try {
      const newExample = await Example.create(req.body);

      return res.status(201).json({
        success: true,
        data: newExample
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        // Pull out the error messages from the errors within err to display to user
        const messages = Object.values(err.errors).map(
          (val: any) => val.message
        );

        return res.status(400).json({
          success: false,
          error: messages
        });
      } else {
        return res.status(500).json({
          success: false,
          error: `Server Error: ${err}`
        });
      }
    }
  }

  // @desc    Delete example
  // @route   DELETE /api/example/:id
  // @access  Public
  public async deleteExample(req: Request, res: Response) {
    try {
      const example = await Example.findById(req.params.id);

      if (!example) {
        return res.status(404).json({
          success: false,
          error: `No example found with ID: ${req.params.id}`
        });
      }

      await example.remove();

      return res.status(200).json({
        success: true,
        data: example
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: `Server Error: ${err}`
      });
    }
  }

  // @desc    Update example
  // @route   POST /api/example/:id
  // @access  Public
  public async updateExample(req: Request, res: Response) {
    try {
      const example = await Example.findById(req.params.id);

      if (!example) {
        return res.status(404).json({
          success: false,
          error: `No example found with ID: ${req.params.id}`
        });
      }

      await example.updateOne(req.body, { new: true });

      const updated = await Example.findById(req.params.id);

      return res.status(200).json({
        success: true,
        data: updated
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: `Server Error: ${err}`
      });
    }
  }
}
