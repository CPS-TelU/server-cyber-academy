let certificates = [];

const addCertificate = (name, certificate) => {
    if (!name || typeof name !== 'string') {
        throw new Error('Invalid name');
    }
    if (!certificate || typeof certificate !== 'string') {
        throw new Error('Invalid certificate');
    }

    const newCertificate = { name, certificate };
    certificates.push(newCertificate);
    return newCertificate;
};

const getCertificatesByName = (name) => {
    if (!name || typeof name !== 'string') {
        throw new Error('Invalid name');
    }

    // Filter certificates by the provided name
    const result = certificates.filter(cert => cert.name === name);
    if (result.length === 0) {
        throw new Error('No certificates found for the given name');
    }
    return result;
};

module.exports = {
    addCertificate,
    getCertificatesByName,
};
