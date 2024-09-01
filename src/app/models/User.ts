import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false, //maybe true ?
    },
  },
  {
    timestamps: true
  }
)

export default mongoose.models.User || mongoose.model("User", userSchema);
