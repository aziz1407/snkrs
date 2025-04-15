// fix the import
import { Types } from "mongoose";
import { ViewGroup } from "../enums/view.enum";

// then use this:
export interface ViewInput {
  memberId: Types.ObjectId;
  viewRefId: Types.ObjectId;
  viewGroup: ViewGroup;
}

export interface View {
  _id: Types.ObjectId;
  viewGroup: ViewGroup;
  memberId: Types.ObjectId;
  viewRefId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
