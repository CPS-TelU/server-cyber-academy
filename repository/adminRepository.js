const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const uploadCertificate = async (grade, status, imageUrl, user_id) => {
    const result = await prisma.certification.create({
        data: {
            grade,
            status,
            image: imageUrl,
            users: {
                connect: {
                    id: user_id  // Pastikan userId adalah integer, bukan array
                }
            },
        }
    });

    return result;
};

const uploadTask = async (title, module, opened_at, closed_at, description, fileUrl) => {
    const result = await prisma.task.create({
        data: {
            title,
            module,
            opened_at: new Date(opened_at).toISOString(),
            closed_at: new Date(closed_at).toISOString(),
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

const uploadModule = async (name, fileUrl, opened_at) => {
    const result = await prisma.modul.create({
        data: {
            name,
            link: fileUrl,
            opened_at: new Date(opened_at).toISOString(),
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

// Get user by Username (for login)
const getAdminByUsername = async (username) => {
    const admin = await prisma.admin.findFirst({
        where: { username },
    });

    return admin;
}

module.exports = { uploadCertificate, registerAdmin, uploadTask, uploadModule, getAdminByUsername }