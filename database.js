import mysql2 from "mysql2";

class MySQLDatabase {
  constructor() {
    this.connection = mysql2.createConnection({
      host: "localhost",
      user: "root",
      password: "root123",
      database: "pokimons",
    });

    this.connection.connect((err) => {
      if (err) {
        console.error("Error al conectar a MySQL: " + err.stack);
        return;
      }
      console.log(
        "Conexión exitosa a MySQL como ID " + this.connection.threadId
      );
    });
  }
  //Metodo para ejecutar querys a lo desgraciado
  query(sql, params, callback) {
    this.connection.query(sql, params, callback);
  }

  close() {
    this.connection.end((err) => {
      if (err) {
        console.error("Error al cerrar la conexión a MySQL: " + err.stack);
        return;
      }
      console.log("Conexión a MySQL cerrada.");
    });
  }
}


export default MySQLDatabase; // Added curly braces around the export statement
