const { Model } = require('sequelize');


module.exports = (sequelize: any, DataTypes: any) => 
{
  class User extends Model 
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     **/
    static associate(models: any) 
    {
      // define association here
    }
  };

  User.init(
  {
    id:
    {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: 
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    patronymic:
    {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: 
    {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: 
      {
        isEmail: 
        {
          args: true,
          msg: 'Must be a valid email address'
        }
      }
    },
    password:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    image:
    {
      type: DataTypes.STRING,
      defaultValue: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    },
    role: 
    {
      type: DataTypes.STRING,
      defaultValue: "USER"
    },
    created_at: 
    {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updated_at: 
    {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, 
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return User;
}