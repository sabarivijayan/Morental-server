import Manufacturer from '../repositories/Manufacturer.js';

export const manufacturerResolvers = {
  Query: {
    getAllManufacturers: async () => {
      try {
        return await Manufacturer.getAllManufacturers();
      } catch (error) {
        throw new Error('Failed to retrieve manufacturers');
      }
    },
    getManufacturerById: async (_, { id }) => {
      try {
        return await Manufacturer.getManufacturerById(id);
      } catch (error) {
        throw new Error('Failed to retrieve manufacturer');
      }
    },
  },
  Mutation: {
    createManufacturer: async (_, { input }) => {
      try {
        return await Manufacturer.createManufacturer(input);
      } catch (error) {
        throw new Error('Failed to create manufacturer');
      }
    },
    updateManufacturer: async (_, { id, name, carModelName, carType }) => {
        // Update logic for the manufacturer
        try {
          const manufacturer = await Manufacturer.findByPk(id);
          if (!manufacturer) {
            throw new Error("Manufacturer not found");
          }
  
          // Update fields if they are provided
          if (name) manufacturer.name = name;
          if (carModelName) manufacturer.carModelName = carModelName;
          if (carType) manufacturer.carType = carType;
  
          await manufacturer.save();
          return manufacturer;
        } catch (error) {
          console.error('Error updating manufacturer:', error);
          throw new Error('Failed to update manufacturer');
        }
      },
    deleteManufacturer: async (_, { id }) => {
      const manufacturer = await Manufacturer.findByPk(id);
      if (!manufacturer) throw new Error("Manufacturer not found");

      await manufacturer.destroy();
      return `Manufacturer with id ${id} deleted successfully`;
    },
  },
};
