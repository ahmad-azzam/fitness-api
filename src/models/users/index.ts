import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Model,
} from "sequelize";
import sequelizeConnection from "../../config/connection";
import AuthUtils from "../../utils/AuthUtils";

class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare phone: string;

  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "Users",
    tableName: "users",
    hooks: {
      beforeCreate: async (user) => {
        user.password = (await AuthUtils.passwordHash(user.password)) as string;
      },
    },
  }
);

export default Users;
