const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { handleFileUpload, handleSertifUpload, handleSubmisUpload, registerAdminService } = require('../services/adminservice');

const uploadFile = async (req, res) => {
    try {
        // Memanggil service untuk mengunggah file ke ImageKit
        const fileData = await handleFileUpload(req.file);

        // Mengembalikan respons dengan data file yang berhasil diunggah
        res.status(200).json({
            success: true,
            message: 'File uploaded successfully!',
            data: fileData
        });
    } catch (error) {
        // Menangani error jika terjadi masalah
        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error.message
        });
    }
};

const uploadSerti = async (req, res) => {
    try {
        const userId = parseInt(req.body.userId, 10);
        const gradeInt = parseInt(req.body.grade, 10); // Konversi userId menjadi integer

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            // Jika user tidak ditemukan, kirimkan response error
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }
        const fileData = await handleSertifUpload(gradeInt, req.body.status, req.file, userId);

        res.redirect('/cms/certificate');

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error.message
        });
    }
};


const uploadSubmis = async (req, res) => {
    try {

        const fileData = await handleSubmisUpload(req.file);
        res.status(200).json({
            success: true,
            message: 'File uploaded successfully!',
            data: fileData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error.message
        });
    }
};

const registerAdminController = async (req, res) => {
    try {
        const register = await registerAdminService(
            req.body.username, 
            req.body.password, 
            req.body.name
        );
        res.status(200).json(register);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

module.exports = {
    uploadFile, uploadSerti, uploadSubmis, registerAdminController
};