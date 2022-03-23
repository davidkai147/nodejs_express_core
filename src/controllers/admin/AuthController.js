const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../../services');
const { responseBuilder } = require('../../plugins');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const template = await emailService.renderTemplate('admin_register_user_complete.ejs', {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  });
  await emailService.sendEmail(user.email, 'Dang ky mail', template);
  responseBuilder(res, httpStatus.CREATED, { user }, 'Create user successfully');
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  responseBuilder(res, httpStatus.OK, { user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  responseBuilder(res, httpStatus.NO_CONTENT, {});
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  responseBuilder(res, httpStatus.OK, { ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  responseBuilder(res, httpStatus.NO_CONTENT, {});
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  responseBuilder(res, httpStatus.NO_CONTENT, {});
});

const activeAccount = catchAsync(async (req, res) => {
  await authService.activeAccount(req.body.token);
  responseBuilder(res, httpStatus.OK, {});
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  activeAccount,
};
