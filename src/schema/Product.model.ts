import mongoose, {Schema} from 'mongoose';
import { 
     ProductCollection,
     ProductStatus,
     ProductSize,
     ProductFilter } from '../libs/enums/product.enum';

const productSchema = new Schema({
   productStatus: {
    type: String,
    enum: ProductStatus.HOLD
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

  productSize: {
    type: String,
    enum: Object.values(ProductSize), 
    default: ProductSize.L, 
  },

  productFilter: {
    type: String,
    enum: ProductFilter,
    default: ProductFilter.MEN,
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

productSchema.index({productName: 1, ProductFilter: 1, ProductSize: 1},
{unique: true});
export default mongoose.model('Product', productSchema);