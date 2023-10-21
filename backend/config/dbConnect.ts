import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  let DB_URI: string = process.env.DB_URI || "";

  if (!DB_URI) {
    throw new Error(
      "Please define the DB_URI environment variable inside .env.local"
    );
  }

  await mongoose.connect(DB_URI);
};

export default dbConnect;
