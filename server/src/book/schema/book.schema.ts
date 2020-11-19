import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    author: { type: String, required: true },
    published: {type: Boolean, required: true } 
  },
  { timestamps: true },
);

export interface Book extends mongoose.Document {
  id: string;
  name: string;
  price: number;
  type: string;
  author: string;
  published: boolean;
}