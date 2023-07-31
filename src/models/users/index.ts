import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Model,
} from "sequelize";
import sequelizeConnection from "../../config/connection";
import AuthUtils from "../../utils/AuthUtils";
import { EUserType } from "../../schemas/auth/register";
import { v4 as uuid } from "uuid";

class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare phone: string;
  declare type: EUserType;

  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuid(),
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
    type: {
      type: DataTypes.ENUM(...Object.values(EUserType)),
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
