const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
      },
      password: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      company_name: DataTypes.STRING,
      address_1: DataTypes.STRING,
      address_2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      post_code: DataTypes.STRING,
      phone: DataTypes.STRING,
      status: DataTypes.STRING,
      payment_method_id: DataTypes.INTEGER,
      currency_id: DataTypes.INTEGER,
      billing_address_id: DataTypes.INTEGER,
      note: DataTypes.TEXT,
      is_2fa: DataTypes.BOOLEAN,
      two_factor_key: DataTypes.STRING,
      email_verify_token: DataTypes.STRING,
      email_verify_expired: DataTypes.DATE,
      email_verified_at: DataTypes.DATE,
      last_login: DataTypes.DATE,
      ip_address: DataTypes.STRING,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      underscored: true,
      timestamps: true,
    }
  );
  return User;
};
