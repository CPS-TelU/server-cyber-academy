const express = require('express');
const router = express.Router();
const { registerAdminController, loginAdminController, logoutAdminController } = require('../../controller/admin/admincontroller')

router.post('/admin/register', registerAdminController);
router.post('/login', loginAdminController);
router.post('/logout', logoutAdminController);

module.exports = router;