const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const uploadCertificate = async (grade, status, imageUrl, user_id) => {
    const result = await prisma.certification.create({
        data: {
            grade,
            status,
            image: imageUrl,
            user: {
                connect: {
                    id: user_id  // Pastikan userId adalah integer, bukan array
                }
            },
        }
    });

    return result;
};

const uploadTask = async (title, modul_id, deadline, description, fileUrl) => {
    const result = await prisma.task.create({
        data: {
            title,
            modul: {
                connect: {
                    id: Number(modul_id),
                }
            },
            deadline: new Date(deadline).toISOString(),
            description,
            file: fileUrl,
        }
    });

    return result;
};

const uploadModule = async (name, fileUrl, user_id, status, description, image, available_at, is_clicked) => {
    const result = await prisma.modul.create({
        data: {
            name: name,
            link: fileUrl,
            user: { connect: { id: user_id } },
            status: status,
            description: description,
            image: image,
            available_at: new Date(available_at).toISOString(),
            is_clicked: is_clicked,
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

module.exports = { 
    uploadCertificate, 
    registerAdmin, 
    uploadTask, 
    uploadModule, 
    getAdminByUsername,
}