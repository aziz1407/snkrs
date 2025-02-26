import express from "express";
import adminController from "./controllers/admin.controller";
import makeUploader from "./utils/uploader";
// import productController from "./controllers/product.controllers";

const routerAdmin = express.Router();

/**Admin */
routerAdmin.get("/", adminController.goHome)
.post(
  "/signup",
  makeUploader("members").single("memberImage"),
  adminController.processSignup
);

routerAdmin.get("/signup", adminController.getSign);

routerAdmin.get("/login", adminController.getLogin);


// routerAdmin
//   .get("/check-me", restaurantController.checkAuthSession)
//   .get("/logout", restaurantController.logout);

// /**Product */
// routerAdmin.get(
//   "/product/all",
//   restaurantController.verifyRestaurant, //middleware pattern
//   productController.getAllProducts
// );

// routerAdmin.post(
//   "/product/create",
//   restaurantController.verifyRestaurant,
//   makeUploader("products").array("productImages", 5),
//   productController.createNewProduct
// );

// routerAdmin.post(
//   "/product/:id",
//   restaurantController.verifyRestaurant, //:id=param=which product is being updated
//   productController.updateChosenProduct
// );

// /**User*/

// routerAdmin.get(
//   "/user/all",
//   restaurantController.verifyRestaurant,
//   restaurantController.getUsers
// );

// routerAdmin.post(
//   "/user/edit",
//   restaurantController.verifyRestaurant,
//   restaurantController.updateChosenUser
// );

export default routerAdmin;