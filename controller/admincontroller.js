const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { handleFileUpload, handleSertifUpload, handleTaskUpload, registerAdminService, loginAdminService, getDashboardData } = require('../services/adminservice');

const uploadFile = async (req, res) => {
    try {
        // Memanggil service untuk mengunggah file ke ImageKit
        const fileData = await handleFileUpload(req.body.name, req.file, req.body.opened_at);

        // Mengembalikan respons dengan data file yang berhasil diunggah
        res.redirect('/cms/module');
    } catch (error) {
        // Menangani error jika terjadi masalah
        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error.message
        });
    }
};

const uploadSerti = async (req, res) => {
    try {
        const user_id = parseInt(req.body.user_id, 10);
        const gradeInt = parseInt(req.body.grade, 10); // Konversi userId menjadi integer

        console.log('User ID:', user_id);  // Log untuk melihat user_id
        console.log('Grade:', gradeInt);   // Log untuk melihat grade

        const user = await prisma.user.findUnique({
            where: {
                id: user_id,
            },
        });

        if (!user) {
            // Jika user tidak ditemukan, kirimkan response error
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }
        const fileData = await handleSertifUpload(gradeInt, req.body.status, req.file, user_id);

        res.redirect('/cms/certificate');

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error.message
        });
    }
};


const uploadTask = async (req, res) => {
    try {

        const fileData = await handleTaskUpload(req.body.title, req.body.module, req.body.openedAt, req.body.closedAt, req.body.description, req.file);

        res.redirect('/cms/tasks');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error.message
        });
    }
};

const registerAdminController = async (req, res) => {
    try {
        const register = await registerAdminService(
            req.body.username, 
            req.body.password, 
            req.body.name
        );
        res.status(200).json(register);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const loginAdminController = async (req, res) => {
    try {
      const login = await loginAdminService(req.body.username, req.body.password);
      res.status(200).json(login);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
}

const getAdminDashboard = async (req, res) => {
    try {
      // Dapatkan data dashboard dari service
      const { participantsCount, tasksCount, submissionsCount, participantList } = await getDashboardData();
  
      // Render ke halaman admin.ejs
      res.render('admin', {
        title: 'Admin Dashboard',
        participants: participantsCount,
        ongoingTasks: tasksCount,
        submittedTasks: submissionsCount,
        newMessages: 5, // Placeholder statis
        participantList, // Daftar peserta
      });
    } catch (error) {
      console.error('Error fetching participants:', error);
      res.status(500).send('Internal Server Error');
    }
  };

module.exports = {
    uploadFile, uploadSerti, uploadTask, registerAdminController, loginAdminController, getAdminDashboard
};