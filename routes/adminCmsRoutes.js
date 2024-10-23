const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const storage = multer.memoryStorage(); // Gunakan memory storage untuk buffer
const upload = multer({ storage });
const adminController = require('../controller/admincontroller');
const taskController = require('../controller/taskController');

router.get('/admin', adminController.getAdminDashboard);
router.get('/tasks', taskController.getTaskPage);

router.get('/submission', async (req, res) => {
  try {
    // Mengambil data sertifikat dari database menggunakan Prisma
    const submissions = await prisma.submission.findMany({
      include: {
          user: true,  // Pastikan `users` di-include
          group: true, // Jika ada relasi dengan groups
          task: true   // Jika ada relasi dengan tasks
      }
  });

    // Mengirimkan data sertifikat ke view EJS
    res.render('submission', { 
      submissionList: submissions,
      title: 'Submission Upload',
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
          user: true // Misalnya jika Anda ingin mengambil relasi dengan tabel user
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

// routes/taskRoutes.js
router.get('/tasks/edit/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id, 10); // Mengambil id dari URL
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Render halaman edit dengan data task yang sudah diisi
    res.render('editTask', { 
      title: 'Edit Task',
      task: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching task' });
  }
});

// Route untuk mengedit task berdasarkan ID
router.put('/tasks/update/:id', async (req, res) => {
  const { id } = req.params; // Ambil ID task dari URL
  const { title, module, openedAt, closedAt, description } = req.body; // Ambil data dari form

  try {
    // Update task di database menggunakan Prisma
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        module,
        opened_at: new Date(openedAt),  // pastikan format tanggal sesuai
        closed_at: new Date(closedAt),
        description,
      },
    });
    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
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