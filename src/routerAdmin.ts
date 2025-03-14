import express from "express";
import adminController  from "./controllers/admin.controller";
import makeUploader from "./libs/utils/uploader";
// import productController from "./controllers/product.controllers";

const routerAdmin = express.Router();

/**Admin */
routerAdmin.get("/", adminController.goHome)
.post(
  "/signup",
  // makeUploader("members").single("memberImage"),
  adminController.processSignup
);

routerAdmin
  .get("/login", adminController.getLogin)
  .post("/login", adminController.processLogin);

  routerAdmin
  .get("/check-me", adminController.checkAuthSession)
  .get("/logout", adminController.logout);

//SPA
routerAdmin.get("/signup", adminController.getSign);

routerAdmin.get("/login", adminController.getLogin);

export default routerAdmin;