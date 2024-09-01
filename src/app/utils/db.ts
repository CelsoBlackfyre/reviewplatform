import mongoose from "mongoose";

const  MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    throw new Error("Connection to MongoDB failed")
  }
};

export default connect;
