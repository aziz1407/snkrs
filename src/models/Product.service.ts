import {
    Product,
    ProductInput,
    ProductInquiry,
    ProductUpdateInput,
  } from "../libs/types/product";
import Errors, { HttpCode, Message } from "../libs/error";
import { ProductStatus } from "../libs/enums/product.enum";
import { T } from "../libs/types/common";
import { ObjectId, Types } from "mongoose";


import ProductModel from "../schema/Product.model";
import { shapeIntoMongooseObjectId } from "../config";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";
import ViewService from "./View.service";

class ProductService {
    private readonly productModel;
    public viewService;

    constructor() {
        this.productModel = ProductModel;
        this.viewService = new ViewService();
      }

      /*SPA*/

  public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
    const match: T = { productStatus: ProductStatus.HOLD};
    if (inquiry.productCollection) 
      match.productCollection = inquiry.productCollection;
    if (inquiry.search) {
      match.productName = { $regex: new RegExp(inquiry.search, "i") }; //flag i
    }

    const sort: T =
      inquiry.order === "productPrice"
        ? { [inquiry.order]: 1 } //ascending
        : { [inquiry.order]: -1 };  //descending

    const result = await this.productModel
      .aggregate([
        { $match: match },
        { $sort: sort },
        { $skip: (inquiry.page - 1) * inquiry.limit },
        { $limit: inquiry.limit },
      ])
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async getProduct(memberId: Types.ObjectId | null, id: string): Promise<Product> {
    const productId = shapeIntoMongooseObjectId(id);
    let result = await this.productModel
      .findOne({
        _id: productId,
        productStatus: ProductStatus.HOLD,
      })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    if (memberId) {
      //check existance
      const input: ViewInput = {
        memberId: memberId,
        viewRefId: productId,
        viewGroup: ViewGroup.PRODUCT,
      };
      const existView = await this.viewService.checkViewExistance(input);

      //insert new view log
      console.log("exist:", !!existView);
      if (!existView) {
        // insert view
        await this.viewService.insertMemberView(input);

        //increase counts
        result = await this.productModel
          .findByIdAndUpdate(
            productId,
            { $inc: { productViews: +1 } },
            { new: true }
          )
          .exec();
      }
    }

    return result as Product;
  }

  //SSR
      
      public async getAllProducts(): Promise<Product[]> {
        const result = await this.productModel.find().exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    
        return result as [];
      }

      public async createNewProduct(input: ProductInput): Promise<Product> {
        try {
          return await this.productModel.create(input) as Product;
        } catch (err) {
          console.error("Error, model:createNewProduct", err);
          throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
      }

      public async updateChosenProduct(
        id: string,
        input: ProductUpdateInput
      ): Promise<Product> {
        //string => ObjectId
        id = shapeIntoMongooseObjectId(id);
        const result = await this.productModel
          .findOneAndUpdate(
            { _id: id }, //FILTER
            input, //UPDATE
            { new: true }
          ) //OPTION
          .exec();
        if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    
        return result as Product;
      }
}



export default ProductService;