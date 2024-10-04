import CarRepository from "../repositories/car-repositories.js";
import minioClient from "../../../config/minio.js";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";

class CarHelper {
  static async createCar({
    name,
    description,
    type,
    quantity,
    numberOfSeats,
    transmissionType,
    fuelType,
    manufacturerId,
    primaryImage,
    secondaryImages,
  }) {
    try {
      const existingCar = await CarRepository.findCarByNameAndManufacturer(
        name,
        manufacturerId
      );
      if (existingCar) {
        throw new Error("Car already exists");
      }

      const primaryImageUrl = await this.uploadToMinio(
        primaryImage,
        `car/${name}/primary`
      );

      const secondaryImagesUrls = await Promise.all(
        secondaryImages.map((image) =>
          this.uploadToMinio(image, `car/${name}/secondary`)
        )
      );

      const car = await CarRepository.createCar({
        manufacturerId,
        name,
        type,
        description,
        quantity,
        fuelType,
        numberOfSeats,
        transmissionType,
        primaryImageUrl,
        secondaryImagesUrls,
      });

      return car;
    } catch (error) {
      console.error("Error adding car: ", error.message);

      throw new Error(error.message || "Failed to add car");
    }
  }

  static async uploadToMinio(file, folder) {
    try {
      const { createReadStream, filename } = await file;
      const stream = createReadStream();
      const uniqueFilename = `${folder}/${uuidv4()}-${filename}`;
      const contentType = mime.lookup(filename) || "application/octet-stream";

      await new Promise((resolve, reject) => {
        minioClient.putObject(
          process.env.MINIO_BUCKET_NAME,
          uniqueFilename,
          stream,
          { "Content-Type": contentType },
          (error) => {
            if (error) {
              return reject(new Error("MinIO upload failed"));
            }
            resolve();
          }
        );
      });

      const imageUrl = await minioClient.presignedGetObject(
        process.env.MINIO_BUCKET_NAME,
        uniqueFilename
      );

      return imageUrl;
    } catch (error) {
      console.error("Error uploading image: ", error.message);
      throw new Error("Failed to upload image");
    }
  }

  static async getCars() {
    try {
      return await CarRepository.getAllCars();
    } catch (error) {
      console.error("Error fetching all cars: ", error.message);
      throw new Error("Failed to fetch all cars");
    }
  }

  static async deleteCarById(id) {
    try {
      const deletedCar = await CarRepository.deleteCarById(id);
      return deletedCar;
    } catch (error) {
      console.error("Error deleting Car:", error.message);
      throw new error(error.message || "Failed to delete Car");
    }
  }

  static async getCarById(id) {
    try {
      const car = await CarRepository.getCarById(id);
      return car;
    } catch (error) {
      console.error("Error fetching Car:", error.message);
      throw new error(error.message || "Failed to fetch Car");
    }
  }

  static async updateCar({
    id,
    name,
    type,
    description,
    fuelType,
    numberOfSeats,
    transmissionType,
    quantity,
    primaryImage,
    secondaryImages,
  }) {
    try {
      const existingCar = await CarRepository.findCarByNameAndManufacturer(
        name
      );
      if (existingCar) {
        throw new Error(
          "Car with the same name and manufacturer already exists"
        );
      }

      const car = await CarRepository.getCarById(id);
      if (!car) {
        throw new Error("Car not found");
      }
      let primaryImageUrl = car.primaryImageUrl;
      let secondaryImagesUrls = car.secondaryImagesUrls;

      if (primaryImage) {
        primaryImageUrl = await this.uploadToMinio(
          primaryImage,
          `car/${name}/primary`
        );
      }

      if (secondaryImages && secondaryImages.length > 0) {
        secondaryImagesUrls = await Promise.all(
          secondaryImages.map((image) =>
            this.uploadToMinio(image, `car/${name}/secondary`)
          )
        );
      }

      const updateCar = await CarRepository.updateCarById(id, {
        name,
        type,
        description,
        fuelType,
        numberOfSeats,
        transmissionType,
        quantity,
        primaryImageUrl,
        secondaryImagesUrls,
      });
      return updateCar;
    } catch (error) {
      throw new Error(error.message || "Failed to update car");
    }
  }
}

export default CarHelper;
