import {
    Product,
    ProductInput,
    ProductInquiry,
    ProductUpdateInput,
  } from "../libs/types/product";
import Errors, { HttpCode, Message } from "../libs/error";
import { ProductStatus } from "../libs/enums/product.enum";
import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";


import ProductModel from "../schema/Product.model";
import { shapeIntoMongooseObjectId } from "../config";

class ProductService {
    private readonly productModel;
  
    constructor() {
        this.productModel = ProductModel;
        // this.viewService = new ViewService();
      }
      
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