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
    console.log("processSignup");
        const file = req.file;
       if(!file) throw new Errors(HttpCode.BAD_REQUEST, Message.NO_IMAGE);

        const newMember: MemberInput = req.body
        newMember.memberImage = file?.path.replace(/\\/g, "/");
        newMember.memberType = MemberType.ADMIN;
        const result = await memberService.processSignup(newMember);
        req.session.member = result;
    req.session.save(() => {
    res.redirect("/admin/product/all");
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
        res.redirect("/admin/product/all");
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

adminController.getUsers =  async (req: Request, res: Response) => {
  try {
      console.log("getUsers");
      const result = await memberService.getUsers();
      res.render("users", {users: result});
  }
  catch (err) {
      console.log('Error, getUsers!', err)
      res.redirect("/admin/login");
  }
};

adminController.updateChosenUser = async (req: Request, res: Response) => {
  try {
      console.log("updateChosenUser");
      const result = await memberService.updateChosenUser(req.body);

      res.status(HttpCode.OK).json({ data: result });
  }
  catch (err) {
      console.log('Error, updateChosenUser!', err);
      if(err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard)
    
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
