const express = require('express');
const commonController = require('../../controllers/CommonController');

const router = express.Router();

router.post('/enable-2fa', commonController.postEnable2FA);
router.post('/verify-2fa', commonController.postVerify2FA);

module.exports = router;
