const imagekit = require('../libs/imagekit');
const { uploadCertificate, registerAdmin } = require('../repository/adminRepository')

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

const handleSertifUpload = async (grade, status, file, userId) => {
    const uploadResponse = await imagekit.upload({
        file: file.buffer.toString('base64'), 
        fileName: file.originalname,
        folder: '/CA/Sertif'
    });
    
    await uploadCertificate(grade, status, uploadResponse.url, userId);
    
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

const registerAdminService = async (username, password, name) => {
    await registerAdmin(username, password, name);
    return { 
        status: true, 
        message: 'Account created' 
    };
}

module.exports = {
    handleFileUpload, handleSertifUpload, handleSubmisUpload, registerAdminService
};