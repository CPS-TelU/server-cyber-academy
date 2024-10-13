const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ModulRepository {
  // Create a new Modul
  async createModul(data) {
    return await prisma.modul.create({
      data: {
        name: data.name,
        link: data.link,
        status: data.status,
        admin: { connect: { id: data.admin_id } }, // Relate to admin
        user: { connect: { id: data.user_id } },   // Relate to user
      },
    });
  }

  // Get all Modul for a specific User or Admin
  async getAllModuls() {
    return await prisma.modul.findMany({
      include: {
        user: true,
        admin: true,
      },
    });
  }

  // Get Modul by ID
  async getModulById(id) {
    return await prisma.modul.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        admin: true,
      },
    });
  }

  // Update a Modul
  async updateModul(id, data) {
    return await prisma.modul.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        link: data.link,
        status: data.status,
        user: { connect: { id: data.user_id } },
        admin: { connect: { id: data.admin_id } },
      },
    });
  }

  // Delete a Modul
  async deleteModul(id) {
    return await prisma.modul.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new ModulRepository();
