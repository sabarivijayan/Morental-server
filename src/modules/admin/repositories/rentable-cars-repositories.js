import Rentable from "../models/rentable-cars-model.js";
import Car from "../models/car-model.js";
import Manufacturer from "../models/manufacturer-model.js";

class RentableRepository {
  static async findAllRentable() {
    try {
      return await Rentable.findAll({
        include: [
          {
            model: Car,
            as: "car",
            include: {
              model: Manufacturer,
              as: "manufacturer",
            },
          },
        ],
      });
    } catch (error) {
      throw new Error(
        "Database error occured while fetching rentable vehicles: " +
          error.message
      );
    }
  }

  static async createRentableCars(data) {
    try {
      return await Rentable.create(data);
    } catch (error) {
      throw new Error("Database error occured while adding rentable cars");
    }
  }

  static async updateRentableCars(id, data) {
    try {
      // Find the rentable car by id
      const rentableCar = await Rentable.findByPk(id);

      // If not found, throw an error
      if (!rentableCar) {
        throw new Error("Rentable car not found");
      }

      // Update the rentable car with the new data
      await rentableCar.update(data);

      // Return the updated rentable car
      return rentableCar;
    } catch (error) {
      throw new Error("An error occurred while updating the rentable car: " + error.message);
    }
  }

  static async deleteRentable(id){
    try {
      const deleteRentable = await Rentable.destroy({
        where: {id}
      });
      if(deleteRentable === 0){
        throw new Error("Rentable car not found");
      }

      return deleteRentable;
    } catch (error) {
      throw new Error('An error occured while deleting the rentable car: ' +error.message);
    }
  }
}

export default RentableRepository;
