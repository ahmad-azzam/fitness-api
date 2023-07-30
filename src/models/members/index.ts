import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelizeConnection from "../../config/connection";
import Users from "../users";
import PersonalTrainers from "../personalTrainers";
import Packages from "../packages";

class Members extends Model<
  InferAttributes<Members>,
  InferCreationAttributes<Members>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare personalTrainerId: number | null;
  declare packageId: number | null;
  declare joinDate: Date;

  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Members.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    personalTrainerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "PersonalTrainers",
        key: "id",
      },
    },
    packageId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Packages",
        key: "id",
      },
    },
    joinDate: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "Members",
    tableName: "members",
  }
);

Users.hasOne(Members, {
  foreignKey: "userId",
});

Members.belongsTo(Users, {
  foreignKey: "userId",
});

PersonalTrainers.hasMany(Members, {
  foreignKey: "personalTrainerId",
});

Members.belongsTo(PersonalTrainers, {
  foreignKey: "personalTrainerId",
});

export default Members;
