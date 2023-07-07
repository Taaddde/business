import mongoose from "mongoose";

export async function connect(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri);
    console.log(`[MongoDB] - Connected`);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

export async function disconnect(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log("[MongoDB] - Disconnected");
  } catch (error) {
    console.error("Failed to disconnect from MongoDB", error);
    throw error;
  }
}
