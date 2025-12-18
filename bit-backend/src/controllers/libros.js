import libroModel from "../models/libro.js";

const librosController = {
  create: async (req, res) => {
    try {
      const { titulo, autor, calcetin, valor, unidades, _id } = req.body;
      const newLibro = new libroModel({
        titulo,
        autor,
        calcetin,
        valor,
        unidades,
        _id,
      });
      const libroCreado = await newLibro.save();
      res
        .status(201)
        .json({
          message: "libro creado satisfactoriamente",
          data: libroCreado,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "libro no fue creado satisfactoriamente",
          data: error.message,
        });
    }
  },

  readAll: async (req, res) => {
    try {
      const allLibros = await libroModel.find();
      res
        .status(200)
        .json({
          message: "libros encontrados satisfactoriamente",
          data: allLibros,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "libros no fueron leidos satisfactoriamente",
          data: error.message,
        });
    }
  },

  readOne: async (req, res) => {
    try {
      const { id } = req.params;
      const libro = await libroModel.findById(id);
      res
        .status(200)
        .json({
          message: "libro fue leido por id satisfactoriamente",
          data: libro,
        });
    } catch (error) {
      res
        .status(404)
        .json({
          message: "libro no fue leido por id satisfactoriamente",
          data: error.message,
        });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, autor, calcetin, valor, unidades, _id } = req.body;
      const libroActualizado = await libroModel.findByIdAndUpdate(id, {
        titulo,
        autor,
        calcetin,
        valor,
        unidades,
        _id,
      });
      res
        .status(200)
        .json({
          message: "libro fue actualizado satisfactoriamente",
          data: libroActualizado,
        });
    } catch (error) {
      res
        .status(304)
        .json({
          message: "libro no fue actualizado satisfactoriamente",
          data: error.message,
        });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const libroEliminado = await libroModel.findByIdAndDelete(id);
      res
        .status(200)
        .json({
          message: "libro eliminado satisfactoriamente",
          data: libroEliminado,
        });
    } catch (error) {
      res
        .status(400)
        .json({
          message: "libro no fue eliminado satisfactoriamente",
          data: error.message,
        });
    }
  },
};
export default librosController;
