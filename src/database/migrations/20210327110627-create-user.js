module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address_1: {
        type: Sequelize.STRING,
      },
      address_2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      post_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      status: {
        type: Sequelize.STRING,
      },
      payment_method_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      currency_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      billing_address_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_2fa: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      two_factor_key: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email_verify_token: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email_verify_expired: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      email_verified_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      last_login: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      ip_address: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
