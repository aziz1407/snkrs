import { Request, Response } from "express";
import { T } from "../libs/types/common";
import { AdminRequest, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/error";
import { MemberType } from "../libs/enums/member.enum";
import MemberService from "../models/Member.service";

const adminController: T = {};
const memberService = new MemberService();

adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("Welcome, goHome");
    res.render("home");
  } catch (err) {
    console.log("Error, goHome!", err);
    res.redirect("/admin");
  }
};

adminController.getSign = (req: Request, res: Response) => {
  try {
    console.log("Welcome, getSign");
    res.render("signup");
  } catch (err) {
    console.log("Error, getSign!", err);
    res.redirect("/admin");
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("Welcome, getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin!", err);
    res.redirect("/admin");
  }
};

adminController.processSignup = async (req: AdminRequest, res: Response) => {
    try {
      console.log("Welcome, processSignup");
      const file = req.file;
      if (!file)
        throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

      const newMember: MemberInput = req.body;
      newMember.memberImage = file?.path.replace(/\\/g, "/");
      newMember.memberType = MemberType.ADMIN;
      const result = await memberService.processSignup(newMember);
      //TODO: SESSIONS
      req.session.member = result;
      req.session.save(() => {
        res.redirect("/admin/product/all");
      }); //req.session.save both saves sid to cookie(frontend) & sessions collection too.
    } catch (err) {
      console.log("Error, processSignup!", err);
      const message =
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
      res.send(
        `<script> alert("${message}"); window.location.replace('/admin/signup') </script>`
      );
    }
}

export default adminController;
