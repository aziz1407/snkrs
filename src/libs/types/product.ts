import { ProductCollection, ProductFilter, ProductSize, ProductStatus }
 from "../enums/product.enum";
 import {ObjectId, Types, Document} from "mongoose";

 export interface Product extends Document {  // Extending Document ensures the Mongoose properties are included
    _id: Types.ObjectId;
    productStatus: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productFilter: ProductFilter;
    productSize: ProductSize;
    productDesc?: string;
    productImages: string[];
    productViews: number;
    createdAt: Date;
    updatedAt: Date;
  }

export interface ProductInquiry {
    order: string;
    page: number;
    limit: number;
    productCollection?: ProductCollection;
    search?: string; 
}

export interface ProductInput {
    productStatus?: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productFilter?: ProductFilter;
    productSize?: number;
    productDesc?: string;
    productImages?: string[];
    productViews?: number;
}

export interface ProductUpdateInput {
    _id: ObjectId;
    productStatus?: ProductStatus;
    productCollection?: ProductCollection;
    productName?: string;
    productPrice?: number;
    productLeftCount?: number;
    productFlter?: ProductFilter;
    productSize?: number;
    productDesc?: string;
    productImages?: string[];
    productViews?: number;
}


