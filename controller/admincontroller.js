const { handleFileUpload, handleSertifUpload, handleSubmisUpload } = require('../services/adminservice');

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
        
        const fileData = await handleSertifUpload(req.file);
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

module.exports = {
    uploadFile, uploadSerti, uploadSubmis,
};
