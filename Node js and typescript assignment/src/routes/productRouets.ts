import express from "express";
import {getAllProducts , getProductDetails , createProduct, updateProduct, deleteProduct} from "../controllers/productController";

const router = express.Router();

router.post("/create-product", createProduct);
router.get("/get-products", getAllProducts);
router.get("/get-product-details/:id", getProductDetails);
router.put("/update-product/:id" , updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
