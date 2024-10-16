const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { registerAdmin, getAdminByUsername } = require('../../repository/admin/adminRepository');

const registerAdminService = async (username, password, name) => {
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await registerAdmin(username, hashedPassword, name);
    return { 
        status: true, 
        message: 'Account created' 
    };
};

const loginAdminService = async (username, password) => {
    const admin = await getAdminByUsername(username);

    if (!admin) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const payload = { id: admin.id, username: admin.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    return {
        status: true,
        message: 'Login success',
        payload,
        token,
    };
};

const logoutAdminService = async (token) => {
    try {
        await blacklistToken(token);
        return { success: true, message: 'Logout successful.' };
    } catch (error) {
        return { success: false, message: 'An error occurred during logout.' };
    }
};

module.exports = { registerAdminService, loginAdminService, logoutAdminService }