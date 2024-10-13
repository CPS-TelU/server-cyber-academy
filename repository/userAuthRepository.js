const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Register user
const registerUser = async (name, nim, email, noHp, gender, faculty, year, major, hashedPassword) => {
    const result = await prisma.user.create({
        data: {
            name,
            nim,
            email,
            noHp,
            gender,
            faculty,
            year,
            major,
            password: hashedPassword,
        },
    });

    return result;
};

// Get user by NIM (for login)
const getUserByNim = async (nim) => {
    const user = await prisma.user.findUnique({
        where: { nim },
    });

    return user;
};

// Logout user (blacklist token)
const blacklistToken = async (token) => {
    const result = await prisma.blacklistedToken.create({
        data: {
            token: token,
            createdAt: new Date(),
        },
    });

    return result;
};

module.exports = { registerUser, getUserByNim, blacklistToken };
