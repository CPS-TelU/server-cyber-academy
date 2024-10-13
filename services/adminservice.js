const imagekit = require('../libs/imagekit');

const handleFileUpload = async (file) => {

    const uploadResponse = await imagekit.upload({
        file: file.buffer.toString('base64'),
        fileName: file.originalname,
        folder: '/CA/Modul'
    });
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

const { getUsersRepository} = require('../repository/adminRepository');

const getUsersService = async () => {
    try {
        // Memanggil fungsi getUsers dari userRepository
        const users = await getUsersRepository();
        return users;
    } catch (error) {
        throw new Error('Gagal memproses data user');
    }
};

module.exports = {
    handleFileUpload, handleSertifUpload, handleSubmisUpload, getUsersService
};