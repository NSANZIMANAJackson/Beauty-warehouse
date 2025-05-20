import { Router } from "express";
const router = Router();
//products
import {
  addProduct,
  updateProduct,
  deleteProduct,
  viewProducts,
} from "../controller/products.js";
//customers
import {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  viewCustomers,
} from "../controller/customers.js";
//order
import {
  addOrder,
  updateOrder,
  deleteOrder,
  viewOrders,
} from "../controller/orders.js";

//routing
router.route("/products").post(addProduct).get(viewProducts);
router.route("/products/:id").patch(updateProduct).delete(deleteProduct); // View single product by ID
router.route("/customers").post(addCustomer).get(viewCustomers);
router.route("/customers/:id").patch(viewCustomers).delete(deleteCustomer); // View single customer by ID
router.route("/orders").post(addOrder).get(viewOrders);
router.route("/orders/:id").patch(viewOrders).delete(deleteOrder); // View single order by ID

export default router;
