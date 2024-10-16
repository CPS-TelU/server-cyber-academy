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

//buat akun admin
//buat login admin
//buat upload sertif
module.exports = { getUsersRepository };
