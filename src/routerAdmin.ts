import express from "express";
import adminController from "./controllers/admin.controller";
// import productController from "./controllers/product.controllers";
// import makeUploader from "./libs/utils/uploader";
const routerAdmin = express.Router();

/**Admin */
routerAdmin.get("/", adminController.goHome);

// routerAdmin
//   .get("/signup", adminController.getSign)
//   .post(
//     "/signup",
//     // makeUploader("members").single("memberImage"),
//     adminController.processSignup
//   );

// routerAdmin
//   .get("/login", adminController.getLogin)
//   .post("/login", adminController.processLogin);

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