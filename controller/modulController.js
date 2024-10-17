const modulService = require('../services/modulService');

class ModulController {
  async createModul(req, res) {
    try {
      const data = req.body;
      const modul = await modulService.createModul(data);
      res.status(201).json(modul);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllModuls(req, res) {
    try {
      const moduls = await modulService.getAllModuls();
      res.status(200).json(moduls);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching moduls' });
    }
  }

  async getModulById(req, res) {
    try {
      const { id } = req.params;
      const modul = await modulService.getModulById(id);
      res.status(200).json(modul);
    } catch (error) {
      res.status(404).json({ message: 'Moduls not found'});
    }
  }

  async updateModul(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedModul = await modulService.updateModul(id, data);
      res.status(200).json(updatedModul);
    } catch (error) {
      res.status(400).json({ message: 'Bad request' });
    }
  }

  async deleteModul(req, res) {
    try {
      const { id } = req.params;
      await modulService.deleteModul(id);
      res.status(200).json({ message: 'Modul deleted successfully' });
    } catch (error) {
      res.status(404).json({ message: 'Modul not found'});
    }
  }
}

module.exports = new ModulController();
