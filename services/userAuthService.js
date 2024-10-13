const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { registerUser, getUserByNim, blacklistToken } = require('../repository/userAuthRepository');

const registerUserService = async (name, nim, className, email, noHp, gender, faculty, year, major, password, document, github) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return {
            status: false,
            message: "Invalid email format."
        };
    }
    
    if (password.length < 6) {
        return {
            status: false,
            message: "Password must be longer than 6 characters."
        };
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await registerUser(name, nim, className, email, noHp, gender, faculty, year, major, hashedPassword, document, github);
    return { 
        status: true, 
        message: 'Account created' 
    };
};

const loginUserService = async (nim, password) => {
    const user = await getUserByNim(nim);

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const payload = { id: user.id, name: user.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    return {
        status: true,
        message: 'Login success',
        payload,
        token,
    };
};

const logoutUserService = async (token) => {
    try {
        await blacklistToken(token);
        return { success: true, message: 'Logout successful.' };
    } catch (error) {
        return { success: false, message: 'An error occurred during logout.' };
    }
};

module.exports = { registerUserService, loginUserService, logoutUserService }