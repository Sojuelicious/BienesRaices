import express from "express";

//Creando la app
const app = express();

//Creando el routing
app.get("/", (req, res) => {
  res.send("Hola mundo");
});
app.get("/nosotros", (req, res) => {
  res.send("Hacerca de nosotros");
});

//Creando el puerto
const port = 3000;
app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`);
});
