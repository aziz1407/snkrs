import express from "express";
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
// import orderController from "./controllers/order.controller";
// import productController from "./controllers/product.controllers";
const router = express.Router();
/** Members **/
router.get("/member/admin", memberController.getAdmin);
router.post("/member/signup", memberController.signup);
router.post("/member/login", memberController.login);

export default router;