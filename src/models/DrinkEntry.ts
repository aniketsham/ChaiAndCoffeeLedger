import mongoose, { Schema, Document, models } from "mongoose";

export interface IDrinkEntry extends Document {
  tea: number;
  coffee: number;
  date: Date;
}

const DrinkEntrySchema = new Schema<IDrinkEntry>({
  tea: { type: Number, default: 0 },
  coffee: { type: Number, default: 0 },
  date: { type: Date, required: true },
});

export default models.DrinkEntry ||
  mongoose.model<IDrinkEntry>("DrinkEntry", DrinkEntrySchema);
