import { Document } from "mongoose";

export interface User extends Document {
  username: String;
  email: String;
  password: String;
  restoreCode: String | null;
  CreatedAt: Date;
}