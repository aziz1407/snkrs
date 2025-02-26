import mongoose, {Schema} from 'mongoose';
import { 
     ProductCollection,
     ProductStatus,
     ProductSize,
     ProductFilter } from '../libs/enums/product.enum';

const productSchema = new Schema({
   productStatus: {
    type: String,
    enum: ProductStatus.PAUSE,
   },

   productCollection: {
    type: String,
    enum: ProductCollection,
    required: true,
   },

   productName: {
    type: String,
    required: true,
   },

   productPrice: {
    type: Number,
    required: true,
   },

   productLeftCount: {
    type: Number,
    required: true,
  },

  productFilter: {
    type: String,
    enum: ProductSize,
    default: ProductFilter.MEN,
  },

  productSize: {
    type: Number,
    enum: ProductSize,
    default: ProductSize.M,
  },

  productDesc: {
    type: String,
},

    productImages: {
    type: [String],
    default: [],
    },

    productViews: {
    type: Number,
    default: 0,
    },
}, 
{ timestamps: true }    
);

productSchema.index({productName: 1, productSize: 1, productVolume: 1},
{unique: true});
export default mongoose.model('Product', productSchema);