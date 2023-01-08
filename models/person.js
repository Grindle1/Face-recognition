import { model, Schema } from "mongoose";

const personSchema = new Schema({
    name: String,
    imageURL: String
});

export const Labels = model("label", personSchema);