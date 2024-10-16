const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/admin', async (req, res) => {
    try {
        // Ambil semua data peserta dari tabel user
        const users = await prisma.users.findMany();
        const tasks = await prisma.tasks.findMany();

        // Hitung jumlah total peserta
        const participantsCount = users.length;
        const tasksCount = tasks.length;

        // Render data ke halaman admin
        res.render('admin', {
            title: 'Admin Dashboard',
            participants: participantsCount, // Jumlah peserta
            ongoingTasks: tasksCount,                // Data statis sebagai placeholder
            submittedTasks: 8,               // Data statis sebagai placeholder
            newMessages: 5,                  // Data statis sebagai placeholder
            participantList: users.map(user => ({
                id: user.id,
                nama: user.name,
                nim: user.nim,
                className: user.className,
                git: `https://github.com/${user.name.toLowerCase().replace(' ', '')}` // Contoh link GitHub dinamis
            }))
        });
    } catch (error) {
        console.error('Error fetching participants:', error);
        res.status(500).send('Internal Server Error');
    }
});

  router.get('/tasks', async (req, res) => {
    try {
      // Mengambil data sertifikat dari database menggunakan Prisma
      const tasks = await prisma.tasks.findMany();
  
      // Mengirimkan data sertifikat ke view EJS
      res.render('tasks', { 
        taskList: tasks,
        title: 'Task Upload' 
      });
    } catch (error) {
      console.error('Error fetching certificates:', error);
      res.status(500).send('Server Error');
    }
});

  router.get('/module', async (req, res) => {
    try {
      // Mengambil data sertifikat dari database menggunakan Prisma
      const moduls = await prisma.moduls.findMany();
  
      // Mengirimkan data sertifikat ke view EJS
      res.render('module', { 
        moduleList: moduls,
        title: 'Module Upload' 
      });
    } catch (error) {
      console.error('Error fetching certificates:', error);
      res.status(500).send('Server Error');
    }
});

router.get('/submission', async (req, res) => {
  try {
    // Mengambil data sertifikat dari database menggunakan Prisma
    const submissions = await prisma.submisions.findMany({
      include: {
          users: true,  // Pastikan `users` di-include
          groups: true, // Jika ada relasi dengan groups
          tasks: true   // Jika ada relasi dengan tasks
      }
  });

    // Mengirimkan data sertifikat ke view EJS
    res.render('submission', { 
      submissionList: submissions,
      title: 'Submission Upload' 
    });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).send('Server Error');
  }
});

  router.get('/certificate', async (req, res) => {
    try {
      // Mengambil data sertifikat dari database menggunakan Prisma
      const certificates = await prisma.certifications.findMany({
        include: {
          users: true // Misalnya jika Anda ingin mengambil relasi dengan tabel user
        }
      });
  
      // Mengirimkan data sertifikat ke view EJS
      res.render('certificate', { 
        certificateList: certificates,
        title: 'Certificate Upload' 
      });
    } catch (error) {
      console.error('Error fetching certificates:', error);
      res.status(500).send('Server Error');
    }
  });
  

  router.get('/participant', (req, res) => {
    res.render('allParticipant', {
        title: 'Participant List',
        participantList: [
            { id: 1, nama: 'John Doe', nim: '12345', className: 'A', group: '1', git: 'https://github.com/johndoe' },
            // data lainnya
        ]
    });
});

router.get('/tasks/add', (req, res) => {
    res.render('addTask', {
        title: 'Add Task'
    });
});

router.get('/tasks/edit', (req, res) => {
    res.render('editTask', {
        title: 'Edit Task'
    });
});

router.get('/module/add', (req, res) => {
  res.render('addModule', {
      title: 'Add Module'
  });
});

router.get('/submission/spectate', (req, res) => {
    res.render('spectateSubmission', {
        title: 'Spectate Submission'
    });
});

router.get('/certificate/add', (req, res) => {
    res.render('addCertificate', {
        title: 'Add Certificate'
    });
});

module.exports = router