const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const uploadCertificate = async (grade, status, imageUrl, user_id) => {
    const result = await prisma.certifications.create({
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
    const result = await prisma.tasks.create({
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
    const result = await prisma.moduls.create({
        data: {
            name,
            file: fileUrl,
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
    const result = await prisma.admins.create({
        data: {
            username,
            password,
            name
        },
    });

    return result;
};


module.exports = { uploadCertificate, registerAdmin, uploadTask, uploadModule }