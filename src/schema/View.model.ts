import mongoose, { Schema, Types } from "mongoose";
import { ViewGroup } from "../libs/enums/view.enum";

const viewSchema = new Schema(
  {
    viewGroup: {
      type: String,
      enum: ViewGroup,
      required: true,
    },

    memberId: {
      type: Types.ObjectId, // 
      required: true,
      ref: "Member",
    },

    viewRefId: {
      type: Types.ObjectId, // 
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("View", viewSchema);
