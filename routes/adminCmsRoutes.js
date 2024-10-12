const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/admin', async (req, res) => {
    try {
        // Ambil semua data peserta dari tabel user
        const users = await prisma.user.findMany();

        // Hitung jumlah total peserta
        const participantsCount = users.length;

        // Render data ke halaman admin
        res.render('admin', {
            title: 'Admin Dashboard',
            participants: participantsCount, // Jumlah peserta
            ongoingTasks: 10,                // Data statis sebagai placeholder
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

  router.get('/tasks', (req, res) => {
    const taskList = [
        { id: 1, title: 'Task 1', module: 'Module 1', createdAt: '2023-10-10', updatedAt: '2023-10-11' },
        { id: 2, title: 'Task 2', module: 'Module 2', createdAt: '2023-10-12', updatedAt: '2023-10-13' },
        // Tambahkan data tugas lainnya
    ];

    res.render('tasks', {
        title: 'Tasks List', // Menyertakan title di sini
        taskList: taskList   // Mengirim daftar tugas
    });
});

router.get('/submission', (req, res) => {
    const submissions = [
        { id: 1, name: 'junaidi R', uploadedAt: '26/08/2024', group: 'Ravenclaw', task: '#1', status: 'In Time' },
        { id: 2, name: 'Yamaha R1', uploadedAt: '26/08/2024', group: 'junaidi/ig', task: '#1', status: 'In Time' },
        { id: 3, name: 'Ducati V4', uploadedAt: '26/08/2024', group: 'junaidi/ig', task: '#2', status: 'Over due' },
        { id: 4, name: 'junaidi R', uploadedAt: '26/08/2024', group: 'junaidi/ig', task: '#2', status: 'Over due' }
      ];

    res.render('submission', { 
    submissionList: submissions,
    title: 'Submission List' // Menambahkan variabel title di sini
  });
  
  });

  router.get('/certificate', (req, res) => {
    const certificate = [
        { id: 1, name: 'junaidi R', group: 'Ravenclaw', grade: '85/100', status: 'Pass' },
        { id: 2, name: 'Yamaha R1', group: 'junaidi/ig', grade: '85/100', status: 'Pass' },
        { id: 3, name: 'Ducati V4', group: 'junaidi/ig', grade: '90/100', status: 'Fail' },
        { id: 4, name: 'junaidi R', group: 'junaidi/ig', grade: '90/100', status: 'Fail' }
      ];

    res.render('certificate', { 
    certificateList: certificate,
    title: 'Certificate Upload' // Menambahkan variabel title di sini
  });
  
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

router.post('/tasks/add', (req, res) => {
    const { title, module, opened, closed, description } = req.body;
    // Logika untuk menyimpan task baru
    console.log('New Task:', { title, module, opened, closed, description });
    
    // Redirect ke halaman list task setelah task ditambahkan
    res.redirect('/cms/tasks');
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