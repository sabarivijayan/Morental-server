import Car from "./car-model";
import Rentable from "./rentable-cars-model";

Car.hasOne(Rentable,{
    foreignKey:'carId',
    onDelete: 'CASCADE',
});

Rentable.belongsTo(Vehicle, {
    foreignKey: 'carId',
    targetKey: 'id',
    onDelete: 'CASCADE',
});