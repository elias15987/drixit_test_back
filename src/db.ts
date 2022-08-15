import mongoose, { connection } from "mongoose";

import { users } from "./models/users/users";

export const connectDB = () => {
  const db = mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() =>   console.log("Database connected"))
    .catch((error) => console.error(error));
};



export const disconnectDB = () => {
    mongoose.disconnect().then(() => console.log("Database disconnected"));
}
