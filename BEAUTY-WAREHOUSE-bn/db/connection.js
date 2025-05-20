import mysql from "mysql2";
const connection = mysql.createPool({
  host: "localhost",
  user: "Jackson",
  password: "NSANZIMANA",
  database: "Beauty_warehouse",
});
export const db = connection.promise();
const connectdb = async () => {
      try {
            await db.query('SELECT 1')
            console.log('Database connected')
      } catch (error) {
            throw error
      }
}
export default connectdb