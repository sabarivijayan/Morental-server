import ManufacturerRepository from '../repositories/manufacturer-repo.js';

class ManufacturerHelper {
  static async addManufacturer(name, carModel, carType) {
    try {
      // Check if the manufacturer already exists by name
      const existingManufacturer = await ManufacturerRepository.findManufacturerByName(name);
      if (existingManufacturer) {
        throw new Error('Manufacturer with the same name already exists');
      }

      // Create manufacturer
      const manufacturer = await ManufacturerRepository.createManufacturer({
        name,
        carModel,
        carType,
      });

      return manufacturer;
    } catch (error) {
      console.error('Error adding manufacturer:', error);
      throw new Error(error.message || 'Failed to add manufacturer');
    }
  }

  static async getManufacturers() {
    try {
      return await ManufacturerRepository.findAll();
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
      throw new Error('Failed to fetch manufacturers');
    }
  }

  static async getManufacturerById(id) {
    try {
      return await ManufacturerRepository.findManufacturerById(id);
    } catch (error) {
      console.error('Error fetching manufacturer by ID:', error);
      throw new Error('Failed to fetch manufacturer');
    }
  }

  static async editManufacturer(id, name, carModel, carType) {
    try {
      // Check if the manufacturer exists
      const existingManufacturer = await ManufacturerRepository.findManufacturerById(id);
      if (!existingManufacturer) {
        throw new Error('Manufacturer not found');
      }

      // Update manufacturer
      const updatedManufacturer = await ManufacturerRepository.updateManufacturer(id, {
        name,
        carModel,
        carType,
      });

      return updatedManufacturer;
    } catch (error) {
      console.error('Error editing manufacturer:', error);
      throw new Error(error.message || 'Failed to edit manufacturer');
    }
  }

  static async deleteManufacturer(id) {
    try {
      const result = await ManufacturerRepository.deleteManufacturer(id);
      return result;
    } catch (error) {
      console.error('Error deleting manufacturer:', error);
      throw new Error('Failed to delete manufacturer');
    }
  }
}

export default ManufacturerHelper;
