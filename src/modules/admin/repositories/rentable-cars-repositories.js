import Rentable from "../models/rentable-cars-model";
import Car from "../models/car-model";
import Manufacturer from "../models/manufacturer-model";

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

  static async updateRentableCars(data) {
  }
}

export default RentableRepository;
