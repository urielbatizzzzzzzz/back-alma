import MySQLDatabase from "../../database.js";

const connection = new MySQLDatabase();

const register = async (req, res) => {
  try {
    const { nombre,apellido,aprobado } = req.body;
    const query = `INSERT INTO alumnos (nombre,apellido,aprobado) VALUES (?,?,?)`;
    const result = await queryDatabase(query, [nombre,apellido,aprobado]);

    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const showOne= async(req,res)=>{
  try {
    const id = req.params.id;
    const query = 'SELECT * FROM alumnos WHERE idalumnos = ?'
    const user = await queryDatabase(query,[id])
    return res.json(user[0])
  } catch (error) {
    console.log(error);
  }
}

const shows = async (req, res) => {
  try {
    const query = "SELECT * FROM alumnos";
    const result = await queryDatabase(query);
    if (!result)
      return res.status(304).json({ message: "No hay usuarios registrados" });
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, apellido, aprobado } = req.body;
    const query = "UPDATE alumnos SET nombre = ?, apellido = ?, aprobado = ? WHERE idalumnos = ?";
    const result = await queryDatabase(query, [nombre, apellido, aprobado, id]);
    if (!result)
      return res.status(400).json({ message: "No hay usuarios registrados" });
    return res.json({ message: "Usuario actualizado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
const deleted = async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM alumnos WHERE idalumnos = ?";
    const result = await queryDatabase(query, [id]);
    if (result.length === 0)
      return res.status(400).json({ message: "No hay usuarios registrados" });
  } catch (error) {
    console.log(error);
  }
};

function queryDatabase(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export { register, shows, update, deleted, showOne };
