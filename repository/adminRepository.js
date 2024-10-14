const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const uploadCertificate = async (grade, status, imageUrl, userId) => {
    const result = await prisma.certification.create({
        data: {
            grade,
            status,
            image: imageUrl,
            user: {
                connect: {
                    id: userId  // Pastikan userId adalah integer, bukan array
                }
            },
        }
    });

    return result;
};

const uploadTask = async (title, module, openedAt, closedAt, description, fileUrl) => {
    const result = await prisma.submission.create({
        data: {
            title,
            module,
            openedAt,
            closedAt,
            description,
            file: fileUrl,
            // user: {
            //     connect: {
            //         id: userId  // Pastikan userId adalah integer, bukan array
            //     }
            // },
        }
    });

    return result;
};

const registerAdmin = async (username, password, name) => {
    const result = await prisma.admin.create({
        data: {
            username,
            password,
            name
        },
    });

    return result;
};


module.exports = { uploadCertificate, registerAdmin, uploadTask }