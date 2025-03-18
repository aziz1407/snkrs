import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
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
    console.log("processSignUp");
    console.log("body:", req.body);

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.ADMIN;
    const result = await memberService.processSignup(newMember);

    req.session.member = result;
    req.session.save(() => {
    res.send(result);
    });
  } catch(err) {
    console.log("Error, processSignUp:", err);
    res.send(err);
  }
}

adminController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
      console.log("Welcome, processLogin");
      const input: LoginInput = req.body;
      const result = await memberService.processLogin(input);
      req.session.member = result;
         req.session.save(() => {
          res.send(result);
         });
  }
  catch (err) {
      console.log('Error, processLogin!', err);
      const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG
      res.send(`<script> 
          alert("${message}");
          window.location.replace('/admin/login');
          </script>`);
  }
};


adminController.checkAuthSession = async (req: AdminRequest, res: Response) => {
  try {
      console.log("checkAuthSession");
     if(req.session?.member) 
      res.send(`<script> alert("${req.session.member.memberNick}") </script>`);
     else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
     //
  }
  catch (err) { 
      console.log('Error, checkAuthSession!', err);
      res.send(err);
  }
};

adminController.logout = async (req: AdminRequest, res: Response) => {
  try {
      console.log("logout");
      req.session.destroy(() => {
      res.redirect("/admin");
    });
  }
  catch (err) {
      console.log('Error, logout!', err);
      res.redirect("/admin");
  }
};

adminController.verifyRestaurant = ( //middleware 
  req: AdminRequest, 
  res: Response,
  next: NextFunction
) => {
  if(req.session?.member?.memberType === MemberType.ADMIN) {
  req.member = req.session.member;
  next();
  }
  else { 
  const message = Message.NOT_AUTHENTICATED
  res.send(`<script> alert("${message}"); window.location.replace('/admin/login'); </script>`);
  }
}


export default adminController;
