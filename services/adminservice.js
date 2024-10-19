const imagekit = require("../libs/imageKit");
const jwt = require('jsonwebtoken');
const {
  uploadCertificate,
  registerAdmin,
  uploadTask,
  uploadModule,
  getAdminByUsername
} = require("../repository/adminRepository");
const userRepository = require("../repository/userRepository")
const taskRepository = require("../repository/taskRepository")
const submissionRepository = require("../repository/submissionRepository")


const handleFileUpload = async (name, file, opened_at) => {
  const uploadResponse = await imagekit.upload({
    file: file.buffer.toString("base64"), // Convert buffer to base64 string
    fileName: file.originalname, // Menggunakan nama asli file
    folder: "/CA/Modul",
  });
  // Logika pemrosesan file jika ada
  await uploadModule(name, uploadResponse.url, opened_at);
  return {
    filename: file.originalname,
    path: file.path,
    size: file.size,
  };
};

const handleSertifUpload = async (grade, status, file, user_id) => {
  const uploadResponse = await imagekit.upload({
    file: file.buffer.toString("base64"),
    fileName: file.originalname,
    folder: "/CA/Sertif",
  });

  await uploadCertificate(grade, status, uploadResponse.url, user_id);

  return {
    filename: file.originalname,
    path: file.path,
    size: file.size,
  };
};

const handleTaskUpload = async (
  title,
  module,
  openedAt,
  closedAt,
  description,
  file
) => {
  const uploadResponse = await imagekit.upload({
    file: file.buffer.toString("base64"),
    fileName: file.originalname,
    folder: "/CA/Submission",
  });

  await uploadTask(
    title,
    module,
    openedAt,
    closedAt,
    description,
    uploadResponse.url
  );

  return {
    filename: file.originalname,
    path: file.path,
    size: file.size,
  };
};

const registerAdminService = async (username, password, name) => {
  await registerAdmin(username, password, name);
  return {
    status: true,
    message: "Account created",
  };
};

const loginAdminService = async (username, password) => {
  const admin = await getAdminByUsername(username);

  if (!admin) {
      throw new Error('User not found');
  }

  if (password !== admin.password) {
    throw new Error('Invalid credentials');
  }

  const payload = { id: admin.id, username: admin.username };
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return {
      status: true,
      message: 'Login success',
      payload,
      token,
    };
};

const getDashboardData = async () => {
  // Ambil data user, task, dan submission melalui repository
  const users = await userRepository.findAllUsers();
  const tasks = await taskRepository.findAllTasks();
  const submissions = await submissionRepository.findAllSubmissions();

  // Hitung jumlah peserta, tugas, dan submission
  const participantsCount = users.length;
  const tasksCount = tasks.length;
  const submissionsCount = submissions.length;

  // Buat array participantList dari data user
  const participantList = users.map(user => ({
    id: user.id,
    nama: user.name,
    nim: user.nim,
    className: user.className,
    git: user.github, // Link GitHub dinamis
  }));

  return {
    participantsCount,
    tasksCount,
    submissionsCount,
    participantList,
  };
};

module.exports = {
  loginAdminService,
  handleFileUpload,
  handleSertifUpload,
  handleTaskUpload,
  registerAdminService,
  getDashboardData,
};
