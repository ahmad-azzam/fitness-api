import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelizeConnection from "../../config/connection";
import Members from "../members";

class Packages extends Model<
  InferAttributes<Packages>,
  InferCreationAttributes<Packages>
> {
  declare id: CreationOptional<number>;
  declare type: string;
  declare price: number;

  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Packages.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
