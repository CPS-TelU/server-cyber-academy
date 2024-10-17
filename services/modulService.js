const modulRepository = require('../repository/modulRepository');

class ModulService {
  async createModul(data) {
    if (!data.name || !data.link || !data.admin_id || !data.user_id) {
      throw new Error('Missing required fields');
    }
    return await modulRepository.createModul(data);
  }

  async getAllModuls() {
    return await modulRepository.getAllModuls();
  }

  async getModulById(id) {
    const modul = await modulRepository.getModulById(id);
    if (!modul) {
      throw new Error('Modul not found');
    }
    return modul;
  }

  async updateModul(id, data) {
    const modul = await modulRepository.getModulById(id);
    if (!modul) {
      throw new Error('Modul not found');
    }

    if (data.admin_id && data.admin_id !== modul.admin_id) {
      throw new Error('Unauthorized admin change');
    }

    return await modulRepository.updateModul(id, data);
  }

  async deleteModul(id) {
    const modul = await modulRepository.getModulById(id);
    if (!modul) {
      throw new Error('Modul not found');
    }

    return await modulRepository.deleteModul(id);
  }
}

module.exports = new ModulService();
