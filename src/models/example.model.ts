import mongoose from "mongoose";

const ExampleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  userId: String
});

export const Example = mongoose.model("Example", ExampleSchema);
