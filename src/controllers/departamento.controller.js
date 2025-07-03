const departamentoService = require('../services/departamento.service');

const getAllDepartamentos = async (req, res) => {
  try {
    const departamentos = await departamentoService.obtenerTodosLosDepartamentos();
    res.json(departamentos);
  } catch (err) {
    console.error('🔴 Error en getAllDepartamentos:', err);
    res.status(500).json({ error: 'Error al obtener departamentos' });
  }
};

const getDepartamentoById = async (req, res) => {
  try {
    const id = req.params.id;
    const departamento = await departamentoService.obtenerDepartamentoPorId(id);
    if (!departamento) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.json(departamento);
  } catch (err) {
    console.error('🔴 Error en getDepartamentoById:', err);
    res.status(500).json({ error: 'Error al buscar departamento' });
  }
};

const createDepartamento = async (req, res) => {
  try {
    const { nombre } = req.body;
    const result = await departamentoService.crearDepartamento(nombre);
    res.status(201).json({ message: 'Departamento creado', insertId: result.insertId });
  } catch (err) {
    console.error('🔴 Error en createDepartamento:', err);
    res.status(500).json({ error: 'Error al crear departamento' });
  }
};

const updateDepartamento = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre } = req.body;
    await departamentoService.actualizarDepartamento(id, nombre);
    res.json({ message: 'Departamento actualizado' });
  } catch (err) {
    console.error('🔴 Error en updateDepartamento:', err);
    res.status(500).json({ error: 'Error al actualizar departamento' });
  }
};

const deleteDepartamento = async (req, res) => {
  try {
    const id = req.params.id;
    await departamentoService.eliminarDepartamento(id);
    res.json({ message: 'Departamento eliminado' });
  } catch (err) {
    console.error('🔴 Error en deleteDepartamento:', err);
    res.status(500).json({ error: 'Error al eliminar departamento' });
  }
};

module.exports = {
  getAllDepartamentos,
  getDepartamentoById,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
};
