import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelizeConnection from "../../config/connection";
import Users from "../users";
import { v4 as uuid } from "uuid";

class PersonalTrainers extends Model<
  InferAttributes<PersonalTrainers>,
  InferCreationAttributes<PersonalTrainers>
> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare memberId: string | null;
  declare price: number | null;

  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

PersonalTrainers.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuid(),
    },
    memberId: {
      type: DataTypes.UUID,
      references: {
        model: "Members",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    price: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "PersonalTrainers",
    tableName: "personal_trainers",
  }
);

Users.hasOne(PersonalTrainers, {
  foreignKey: "userId",
  as: "personalTrainer",
});

PersonalTrainers.belongsTo(Users, {
  foreignKey: "userId",
});

export default PersonalTrainers;
