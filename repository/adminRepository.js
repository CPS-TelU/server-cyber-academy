const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUsersRepository = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                name: true,
                nim: true,
                class: true
            }
        });
        return users;
    } catch (error) {
        throw new Error('Gagal mengambil data user');
    }
};

module.exports = { getUsersRepository };
