// lib/dbConnect.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL_MONGODB;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the DATABASE_URL_MONGODB environment variable inside .env.local"
  );
}

let cached = global.mongooseConn;
if (!cached) {
  cached = global.mongooseConn = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
