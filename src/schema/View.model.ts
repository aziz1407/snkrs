import mongoose, { Schema } from "mongoose";
import { ViewGroup } from "../libs/enums/view.enum";
import ObjectId from "mongoose";

const viewSchema = new Schema(
  {
    viewGroup: {
      type: String,
      enum: ViewGroup,
      required: true,
    },

    memberId: {
      type: ObjectId,
      required: true,
      ref: "Member",
    },

    viewRefId: {
      type: ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("View", viewSchema);
