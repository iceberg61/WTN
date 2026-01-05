import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}


interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}


declare global {
  var mongoose: Cached | undefined;
}


let cached: Cached = (globalThis ).mongoose ?? { conn: null, promise: null };

if (!cached.conn || !cached.promise) {
  (globalThis ).mongoose = cached = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      console.log("✅ MongoDB Connected");
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; 
    throw e;
  }

  return cached.conn;
}