import { Request, Response} from 'express';
import { T } from '../libs/types/common';
// import MemberService from '../models/Member.service';
// import { AdminRequest, LoginInput, MemberInput } from '../libs/types/member';
import { MemberType } from '../libs/enums/member.enum';
// import Errors, { HttpCode, Message } from '../libs/errors';

// const memberService = new MemberService();
const adminController: T = {};
adminController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.render('home');
    }
    catch (err) {
        console.log('Error, goHome!', err);
        res.redirect("/admin");
    }
};

export default adminController;