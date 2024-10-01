import { Manufacturer } from '../models/manufacturer-model';
import ManufacturerHelper from '../helpers/manufacturer-helper';


class ManufacturerRepository {
  async getAllManufacturers() {
    try {
      const manufacturers = await Manufacturer.findAll();
      return manufacturers;
    } catch (error) {
      throw new Error('Database query failed');
    }
  }

  async getManufacturerById(id) {
    try {
      const sanitizedId = ManufacturerHelper.sanitizeInput(id);
      const manufacturer = await Manufacturer.findByPk(sanitizedId);
      if (!manufacturer) {
        throw new Error('Manufacturer not found');
      }
      return manufacturer;
    } catch (error) {
      throw new Error('Database query failed');
    }
  }

  async createManufacturer(input) {
    try {
      ManufacturerHelper.validateManufacturerInput(input);
      const formattedInput = ManufacturerHelper.formatManufacturerData(input);
      const manufacturer = await Manufacturer.create(formattedInput);
      return manufacturer;
    } catch (error) {
      throw new Error(ManufacturerHelper.formatErrorResponse(error));
    }
  }

  async updateManufacturer(id, input) {
    try {
      ManufacturerHelper.validateManufacturerInput(input);
      const manufacturer = await Manufacturer.findByPk(id);
      if (!manufacturer) {
        throw new Error('Manufacturer not found');
      }
      const formattedInput = ManufacturerHelper.formatManufacturerData(input);
      await manufacturer.update(formattedInput);
      return manufacturer;
    } catch (error) {
      throw new Error(ManufacturerHelper.formatErrorResponse(error));
    }
  }

  async deleteManufacturer(id) {
    try {
      const sanitizedId = ManufacturerHelper.sanitizeInput(id);
      const manufacturer = await Manufacturer.findByPk(sanitizedId);
      if (!manufacturer) {
        throw new Error('Manufacturer not found');
      }
      await manufacturer.destroy();
      return true;
    } catch (error) {
      throw new Error(ManufacturerHelper.formatErrorResponse(error));
    }
  }
}

module.exports = new ManufacturerRepository();
