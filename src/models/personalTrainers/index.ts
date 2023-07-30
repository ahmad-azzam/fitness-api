import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelizeConnection from "../../config/connection";
import Users from "../users";
import Members from "../members";

class PersonalTrainers extends Model<
  InferAttributes<PersonalTrainers>,
  InferCreationAttributes<PersonalTrainers>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare memberId: number;
  declare price: number;

  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

PersonalTrainers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    memberId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Members",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
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
});

PersonalTrainers.belongsTo(Users, {
  foreignKey: "userId",
});

export default PersonalTrainers;
