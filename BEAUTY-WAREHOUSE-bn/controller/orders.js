import { db } from "../db/connection.js";
import { createCustomAPIError } from "../errors/customAPIerror.js";
const addOrder = async (req, res, next) => {
  const { product_id, customer_id } = req.body;
  if (!product_id || !customer_id) {
    next(createCustomAPIError("Please provide all values 😐", 400));
  }
  try {
    const [rows] = await db.query(
      "INSERT INTO orders(product_id, customer_id) VALUES (?,?)",
      [parseInt(product_id), parseInt(customer_id)]
    );
    res.status(201).json({ msg: "order made successfully 😀" });
  } catch (error) {
    next(error);
  }
};
const updateOrder = (req, res) => {
  res.send("can update Order");
};
const deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM orders WHERE order_id = ?", [id]);
    res.status(200).send('Order was successfully deleted')
  } catch (error) {
    next(error);
  }
};
const viewOrders = async (req, res, next) => {
  const query = `SELECT 
  orders.order_id,
  customers.last_name,
  customers.first_name,
  products.product_name,
  orders.order_date
  FROM orders
  JOIN customers ON orders.customer_id = customers.customer_id
  JOIN products ON products.product_id = orders.product_id;
  `;

  try {
    const [rows] = await db.query(query);
    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
export { addOrder, updateOrder, deleteOrder, viewOrders };
