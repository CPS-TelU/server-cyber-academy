const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ModulRepository {
  // Create a new Modul
  async createModul(data) {
    return await prisma.modul.create({
      data: {
        name: data.name,
        link: data.link,
        user: { connect: { id: data.user_id } },
        status: data.status,
        description: data.description,
        image: data.image,
        available_at: data.available_at,
        is_clicked: data.is_clicked,
      },
    });
  }

  // Get all Moduls
  async getAllModuls() {
    return await prisma.modul.findMany({
      include: {
        user: true,
      },
    });
  }

  // Get Modul by ID
  async getModulById(id) {
    return await prisma.modul.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
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
