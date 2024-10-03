import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";
import Manufacturer from "./manufacturer-model";

class Car extends Model {}

Car.init({
  manufacturerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Manufacturers",
      key: "id",
    },
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numberOfSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fuelType: {
    type: DataTypes.ENUM("petrol", "diesel"),
    allowNull: false,
  },
  transmissionType: {
    type: DataTypes.ENUM("automatic", "manual"),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  primaryImageUrl: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
  secondaryImagesUrls: {
    type: DataTypes.ARRAY(DataTypes.STRING(1000)),
    allowNull: true,
  },
},{
    sequelize,
    modelName: "Car",
});

Car.belongsTo(Manufacturer, {
    foreignKey: "manufacturerId",
    as: 'manufacturer',
});

export default Car;