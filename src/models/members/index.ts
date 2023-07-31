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
import { v4 as uuid } from "uuid";

class Members extends Model<
  InferAttributes<Members>,
  InferCreationAttributes<Members>
> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare personalTrainerId: string | null;
  declare packageId: string | null;
  declare joinDate: Date;

  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Members.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuid(),
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    personalTrainerId: {
      type: DataTypes.UUID,
      references: {
        model: "PersonalTrainers",
        key: "id",
      },
    },
    packageId: {
      type: DataTypes.UUID,
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
  as: "members",
});

Members.belongsTo(Users, {
  foreignKey: "userId",
});

PersonalTrainers.hasMany(Members, {
  foreignKey: "personalTrainerId",
  as: "members",
});

Members.belongsTo(PersonalTrainers, {
  foreignKey: "personalTrainerId",
  as: "personalTrainer",
});

export default Members;
