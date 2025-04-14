import express from "express";
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";
// import orderController from "./controllers/order.controller";
// import productController from "./controllers/product.controllers";
const router = express.Router();
/** Members **/
router.get("/member/admin", memberController.getAdmin);
router.post("/member/signup", memberController.signup);
router.post("/member/login", memberController.login);
router.post(
    "/member/logout",
    memberController.verifyAuth,
    memberController.logout
  );
  router.get(
    "/member/detail", //req.member = null
    memberController.verifyAuth, //req.member = memberData
    memberController.getMemberDetail
  );
  
  router.post(
    "/member/update",
    memberController.verifyAuth,
    uploader("members").single("memberImage"),
    memberController.updateMember
  );

  router.get("/member/top-users", memberController.getTopUsers);

  /** PRODUCTS **/
router.get("/product/all", productController.getProducts);
router.get("/product/:id",
memberController.retrieveAuth,
productController.getProduct
);


export default router;