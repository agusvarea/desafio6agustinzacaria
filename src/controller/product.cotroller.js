import Products from "../dao/dbmanager/product.js";
import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
import { generateProductErrorInfo } from "../services/info.js";

const products = new Products();

const getProducts = async (req, res) => {
    try {
        const response = await products.getAll();
        res.json({
            message: "Lista de productos",
            data: response
        });
    } catch (error) {
        console.log("Error: ", error);
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await products.getById(id);
        res.json(response)
    } catch (error) {
        console.log("Error: ", error);
    }
}

const createProduct = async(req, res) => {
    const { name, description, price, category, brand, color, size,code, imageUrl, stock } = req.body;
    try {
        const response = await products.saveProduct({
            name,
            description,
            price,
            category,
            brand,
            color,
            size,
            code,
            imageUrl,
            stock
        });
        res.json(response)
    } catch (error) {
        console.log('Error al crear el producto', error);
        CustomError.createError({
            name: "Error al crear el producto",
            cause: error,
            message: "Error al crear el producto",
            code: EErrors.INVALID_TYPES_ERROR,
        })
    }
}

const editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, brand, color, size,code, imageUrl, stock } = req.body;

    try {
        const newProduct = { name, description, price, category, brand, color, size,code, imageUrl, stock };

        const response = await products.updateProduct(id, newProduct);
        res.json(response);
    } catch (error) {
        console.log(`Error actualizando el producto ${id}`, error);
    };
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await products.deleteProduct(id);
        res.json(response);
    } catch (error) {
        console.log("Error eliminado el producto", error);
    }
}

export {getProducts,getProductById,createProduct,editProduct,deleteProduct}