const imagekit = require("../libs/imageKit");
const {
  uploadCertificate,
  registerAdmin,
  uploadTask,
  uploadModule,
} = require("../repository/adminRepository");

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

module.exports = {
  handleFileUpload,
  handleSertifUpload,
  handleTaskUpload,
  registerAdminService,
};
