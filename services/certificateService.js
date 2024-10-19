// certificateService.js
const certificateRepository = require('../repository/certificateRepository');

const getAllCertificates = async () => {
    return await certificateRepository.getAllCertificates();
};

const getCertificateById = async (id) => {
    return await certificateRepository.getCertificateById(id);
};

const createCertificate = async (data) => {
    if (!data.name || !data.image || !data.user_id) {
        throw new Error('Name, Image, and User ID are required');
    }
    return await certificateRepository.createCertificate(data);
};

const updateCertificate = async (id, data) => {
    return await certificateRepository.updateCertificate(id, data);
};

const deleteCertificate = async (id) => {
    return await certificateRepository.deleteCertificate(id);
};

module.exports = {
    getAllCertificates,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate
};
