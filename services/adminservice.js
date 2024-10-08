const imagekit = require('../config/imagekit');

const handleFileUpload = async (file) => {

    const uploadResponse = await imagekit.upload({
        file: file.buffer.toString('base64'), // Convert buffer to base64 string
        fileName: file.originalname, // Menggunakan nama asli file
        folder: '/CA/Modul'
    });
    // Logika pemrosesan file jika ada
    return {
        filename: file.originalname,
        path: file.path,
        size: file.size,
    };
};

const handleSertifUpload = async (file) => {

    const uploadResponse = await imagekit.upload({
        file: file.buffer.toString('base64'), 
        fileName: file.originalname,
        folder: '/CA/Sertif'
    });
    return {
        filename: file.originalname,
        path: file.path,
        size: file.size,
    };
};

const handleSubmisUpload = async (file) => {

    const uploadResponse = await imagekit.upload({
        file: file.buffer.toString('base64'),
        fileName: file.originalname, 
        folder: '/CA/Submission'
    });
    return {
        filename: file.originalname,
        path: file.path,
        size: file.size,
    };
};

module.exports = {
    handleFileUpload, handleSertifUpload, handleSubmisUpload
};