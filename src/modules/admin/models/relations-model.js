import Car from "./car-model.js";
import Rentable from "./rentable-cars-model.js";

Car.hasOne(Rentable,{
    foreignKey:'carId',
    onDelete: 'CASCADE',
});

Rentable.belongsTo(Car, {
    foreignKey: 'carId',
    targetKey: 'id',
    onDelete: 'CASCADE',
});