import { MemberStatus, MemberType } from "../enums/member.enum";
import {ObjectId, Types, Document} from "mongoose";
import { Session } from "express-session";
import { Request } from "express";

export interface Member {             //returning from database       
    _id: Types.ObjectId;          
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberNick: string;
    memberPhone: string;
    memberPassword?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
    memberPoints: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface MemberInput {            //coming from postman
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberNick: string;
    memberPhone: string;
    memberPassword: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
    memberPoints?: number;
}

export interface LoginInput {
    memberNick: string;
    memberPassword: string;
}

export interface MemberUpdateInput {  
    _id: ObjectId;            //coming from postman
    memberStatus?: MemberStatus;
    memberNick?: string;
    memberPhone?: string;
    memberPassword?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
}

export interface ExtendedRequest extends Request {
    member: Member; 
    file: Express.Multer.File;
    files: Express.Multer.File[];
}

export interface AdminRequest extends Request {
    member: Member;
    session: Session & { member: Member}; 
    file: Express.Multer.File;
    files: Express.Multer.File[];
}