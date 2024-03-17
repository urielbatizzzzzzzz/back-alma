import app from "./app.js";
import http from "http";
import MySQLDatabase from "./database.js";

const connection=new MySQLDatabase();
const server = http.createServer(app);

server.listen(3000, () => {
    console.log(`Server is running on port 3000`);
  });