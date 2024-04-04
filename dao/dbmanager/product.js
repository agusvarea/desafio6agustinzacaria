import { ProductModel } from "../models/product.js";

export default class Products {
    constructor() {
        console.log("Working products with database in mongodb")
    };

    async getAll(page = 1, limit = 10, sort = "", query = {}) {
        let sortOrder = 0;

        if(sort.toLowerCase() === "asc") {
            sortOrder = 1;
        } else if (sort.toLowerCase() === "desc") {
            sortOrder = -1;
        }

        const options = {
            page: page,
            limit: limit,
            sort: sortOrder ? {price: sortOrder } : undefined,
            lean: true,
        };

        const products = await ProductModel.paginate(query, options);
        return products;
    };

    async getById(id) {
        let product = await ProductModel.findById(id).lean();
        return product
    };

    async saveProduct(product) {
        try {
            let newProduct = new ProductModel(product);
            let result = await newProduct.save();
            return result;
        } catch (error) {
            console.log('Error: ' + error);
            throw error;
        }
    };

    async updateProduct(id, product) {
        const result = await ProductModel.updateOne({ _id: id }, product);
        return result
    };

    async deleteProduct(id) {
        const result = await ProductModel.findByIdAndDelete(id)
        return result
    };
}