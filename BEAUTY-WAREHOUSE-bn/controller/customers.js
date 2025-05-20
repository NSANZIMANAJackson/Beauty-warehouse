import { db } from "../db/connection.js";
import { createCustomAPIError } from "../errors/customAPIerror.js";
const addCustomer = async (req, res, next) => {
  const { first_name, last_name, location, telephone } = req.body;
  
  if ((!first_name || !last_name || !location || !telephone)) {
    next(createCustomAPIError("Please provide all values", 400));
  }
  try {
    const [rows] = await db.query(
      "INSERT INTO customers(first_name, last_name, location,telephone) VALUES (?,?,?,?)",
      [first_name, last_name, location, telephone]
    );
    res.status(201).json({ msg: "customer added successfully" });
  } catch (error) {
    next(error);
  }
};
const updateCustomer = (req, res) => {
  res.send("can update Customer");
};
const deleteCustomer = (req, res) => {
  res.send("can delete Customer");
};
const viewCustomers = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM customers");
    res.status(200).json({ rows });
  } catch (error) {
    next(error);
  }
};
export { addCustomer, updateCustomer, deleteCustomer, viewCustomers };
