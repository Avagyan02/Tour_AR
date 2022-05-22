import { Schema } from "mongoose";

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  restoreCode: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
})
