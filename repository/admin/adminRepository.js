const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Register Admin
const registerAdmin = async (username, hashedPassword, name) => {
    const result = await prisma.admin.create({
        data: {
            username,
            password: hashedPassword,
            name
        },
    });

    return result;
};

// Get user by Username (for login)
const getAdminByUsername = async (username) => {
    const admin = await prisma.admin.findUnique({
        where: { username },
    });

    return admin;
};

// // Logout user (blacklist token)
// const blacklistToken = async (token) => {
//     const result = await prisma.blacklistedToken.create({
//         data: {
//             token: token,
//             createdAt: new Date(),
//         },
//     });

//     return result;
// };

module.exports = { registerAdmin, getAdminByUsername };