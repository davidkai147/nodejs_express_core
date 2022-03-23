const httpStatus = require('http-status');
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const ApiError = require('../../utils/ApiError');
const sequelize = require('../../database/connection');
const moment = require('moment');
const config = require('../../config/config');
const crypto = require('crypto');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  if (await isPhoneTaken(userBody.phone)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone already taken');
  }

  userBody.password = await bcrypt.hash(userBody.password, 8);
  userBody.status = 'active';
  const expires = moment().add(config.jwt.emailVerifyExpirationDays, 'days');
  userBody.email_verify_token = crypto.randomBytes(20).toString('hex');
  userBody.email_verify_expired = expires;

  try {
    return await sequelize.transaction(async (t) => {
      return await User.create(userBody, { transaction: t });
    });
  } catch (error) {
    console.log('sai roi');
  }
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findByPk(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ where: { email: email } });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.destroy();
  return user;
};

/**
 * Check email existed or not
 * @param {string} email
 * @returns {Promise<User>}
 */
const isEmailTaken = async (email) => {
  return User.findOne({
    where: {
      email: email,
    },
  });
};

/**
 * Check phone existed or not
 * @param {string} phone
 * @returns {Promise<User>}
 */
const isPhoneTaken = async (phone) => {
  return User.findOne({
    where: {
      phone: phone,
    },
  });
};

const advanceGet = async (conditions) => {
  return User.findOne({
    where: conditions,
  });
};

const isPasswordMatch = async (userPassword, password) => {
  return bcrypt.compare(password, userPassword);
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  isEmailTaken,
  isPhoneTaken,
  isPasswordMatch,
  advanceGet,
};
