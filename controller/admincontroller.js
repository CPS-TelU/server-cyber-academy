const { handleFileUpload, handleSertifUpload, handleSubmisUpload, getUsersService } = require('../services/adminservice');

const uploadFile = async (req, res) => {
    try {
        
        const fileData = await handleFileUpload(req.file);
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

// Controller untuk mengambil data user (name, nim, class)
const getUsersController = async (req, res) => {
    try {
        const users = await getUsersService();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadFile, uploadSerti, uploadSubmis, getUsersController
};