const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const storage = multer.memoryStorage(); // Gunakan memory storage untuk buffer
const upload = multer({ storage });

router.get('/admin', async (req, res) => {
    try {
        // Ambil semua data peserta dari tabel user
        const users = await prisma.user.findMany({
          include: {
              groups: true, // Ini akan memuat relasi groups untuk setiap user
          },
      });
        const tasks = await prisma.task.findMany();
        const submissions = await prisma.submission.findMany();

        // Hitung jumlah total peserta
        const participantsCount = users.length;
        const tasksCount = tasks.length;
        const submissionsCount = submissions.length;

        // Render data ke halaman admin
        res.render('admin', {
            title: 'Admin Dashboard',
            participants: participantsCount, // Jumlah peserta
            ongoingTasks: tasksCount,                // Data statis sebagai placeholder
            submittedTasks: submissionsCount,               // Data statis sebagai placeholder
            newMessages: 5,                  // Data statis sebagai placeholder
            participantList: users.map(user => ({
                id: user.id,
                nama: user.name,
                nim: user.nim,
                className: user.className,
                git: user.github // Contoh link GitHub dinamis
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
      const tasks = await prisma.task.findMany();
  
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
      const moduls = await prisma.modul.findMany();
  
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
    const submissions = await prisma.submission.findMany({
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
      const certificates = await prisma.certification.findMany({
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

// Route untuk halaman edit module
router.get('/module/edit/:id', async (req, res) => {
  const moduleId = parseInt(req.params.id);  // Mengambil ID dari URL

  try {
      // Mengambil data module dari database berdasarkan ID
      const moduleData = await prisma.modul.findUnique({
          where: { id: moduleId }
      });

      if (!moduleData) {
          return res.status(404).send('Module not found');
      }

      // Render halaman edit module dan kirim data module ke view
      res.render('editModule', { 
          title: 'Edit Module',
          module: moduleData 
      });
  } catch (error) {
      console.error('Error fetching module:', error);
      res.status(500).send('Internal Server Error');
  }
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

// Route untuk update module menggunakan PUT
router.put('/module/update/:id', upload.single('file'), async (req, res) => {
  const moduleId = parseInt(req.params.id);
  const { name, opened_at } = req.body;

  // Validasi dan proses date
  let openedAtDate = new Date(opened_at);
  if (isNaN(openedAtDate)) {
      return res.status(400).json({ message: 'Invalid date' });
  }

  const file = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
      // Update modul di database
      const updatedModule = await prisma.modul.update({
          where: { id: moduleId },
          data: {
              name: name || undefined,
              opened_at: openedAtDate,
              file: file
          }
      });

      // Kirim respons
      res.status(200).json({ message: 'Module updated successfully' });
  } catch (error) {
      console.error('Error updating module:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Route untuk menangani DELETE
router.delete('/certificate/delete/:id', async (req, res) => {
  const moduleId = parseInt(req.params.id);

  try {
      // Hapus data module dari database
      await prisma.certification.delete({
          where: { id: moduleId }
      });

      res.status(200).json({ message: 'Module deleted successfully' });
  } catch (error) {
      console.error('Error deleting module:', error);
      res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router