import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelizeConnection from "../../config/connection";
import Members from "../members";
import { v4 as uuid } from "uuid";

class Packages extends Model<
  InferAttributes<Packages>,
  InferCreationAttributes<Packages>
> {
  declare id: CreationOptional<string>;
  declare type: string;
  declare price: number;

  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Packages.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuid(),
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "Packages",
    tableName: "packages",
  }
);

Packages.hasMany(Members, {
  foreignKey: "packageId",
});

Members.belongsTo(Packages, {
  foreignKey: "packageId",
});

export default Packages;
