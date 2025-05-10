import mongoose, { Schema, Document, models } from "mongoose";

export interface ITransaction extends Document {
  description: string;
  amount: number;
  date: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
