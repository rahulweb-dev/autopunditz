import mongoose from "mongoose";

const AdminSchema =
  new mongoose.Schema(
    {
      email: String,

      password: String,

      role: {
        type: String,
        enum: ["admin", "writer"],
        default: "writer",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models.Admin ||
  mongoose.model(
    "Admin",
    AdminSchema
  );