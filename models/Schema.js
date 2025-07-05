import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const DataSchema = new mongoose.Schema({
  Name: { type: String, require: true, default: "UNDEFINED" },
  City: { type: String, require: true, default: "UNDEFINED" },
  Language: { type: String, require: true, default: "UNDEFINED" },
  Salary: { type: Number, require: true, default: 2000000},
  IsManager: {type:Boolean,require:true,default:true}
});

export const DATA = mongoose.model("Data", DataSchema)