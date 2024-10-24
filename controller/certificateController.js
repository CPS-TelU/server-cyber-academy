// certificateController.js
const certificateService = require('../services/certificateService');

const getAllCertificates = async (req, res) => {
    try {
        const certificates = await certificateService.getAllCertificates();
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCertificateById = async (req, res) => {
    try {
        const certificate = await certificateService.getCertificateById(req.params.id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.json(certificate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCertificate = async (req, res) => {
    try {
        const certificate = await certificateService.createCertificate(req.body);
        res.status(201).json({ message: 'Certificate created successfully', certificate });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateCertificate = async (req, res) => {
    try {
        const certificate = await certificateService.updateCertificate(req.params.id, req.body);
        res.json({ message: 'Certificate updated successfully', certificate });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteCertificate = async (req, res) => {
    try {
        await certificateService.deleteCertificate(req.params.id);
        res.status(200).json({ message: 'Certificate deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCertificateByUserIdController = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    
    try {
        const certificates = await certificateService.fetchCertificateByUserId(userId);
        return res.status(200).json({ success: true, data: certificates });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllCertificates,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate,
    getCertificateByUserIdController
};
