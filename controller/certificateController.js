const certificateService = require('../services/certificateService');

const postCertificate = (req, res) => {
    const { name, certificate } = req.body;

    try {
        const newCertificate = certificateService.addCertificate(name, certificate);
        return res.status(201).json({
            message: "Certificate added successfully",
            certificate: newCertificate,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

const getCertificates = (req, res) => {
    const { name } = req.body; // Name is now passed via JSON body

    try {
        const certificatesByName = certificateService.getCertificatesByName(name);
        return res.status(200).json({
            certificates: certificatesByName,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = {
    postCertificate,
    getCertificates,
};
