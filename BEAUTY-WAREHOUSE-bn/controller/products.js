import { db } from "../db/connection.js";
import { createCustomAPIError } from "../errors/customAPIerror.js";
const addProduct = async (req, res, next) => {
  const { product_name, product_quantity, unit_price } = req.body;
  if (!product_name || !product_quantity || !unit_price) {
    next(createCustomAPIError("Please provide all values", 400));
  }
  const total_price = product_quantity * unit_price;
  try {
    const [rows] = await db.query(
      "INSERT INTO products(product_name, product_quantity, unit_price,total_price) VALUES (?,?,?,?)",
      [product_name, product_quantity, unit_price, total_price]
    );
    res.status(201).json({ msg: "Product added successfully" });
  } catch (error) {
    next(error);
  }
};
const updateProduct = (req, res) => {
  res.send("can update product");
};
const deleteProduct = (req, res) => {
  res.send("can delete product");
};
const viewProducts = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.status(200).json({ rows });
  } catch (error) {
    next(error);
  }
};
export { addProduct, updateProduct, deleteProduct, viewProducts };
