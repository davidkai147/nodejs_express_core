const catchAsync = require('../utils/catchAsync');
const { generateUniqueSecret, generateOTPToken, generateQRCode, verifyOTPToken } = require('../plugins/2fa');

const postEnable2FA = catchAsync(async (req, res) => {});

const postVerify2FA = catchAsync(async (req, res) => {});

module.exports = {
  postEnable2FA,
  postVerify2FA,
};
