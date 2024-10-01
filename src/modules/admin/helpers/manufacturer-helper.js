class ManufacturerHelper {
    /**
     * Validates the input data for creating or updating a manufacturer.
     * @param {Object} input - The input object containing manufacturer data.
     * @param {string} input.name - The name of the manufacturer.
     * @param {string} input.carModelName - The car model name.
     * @param {string} input.carType - The type of the car (e.g., SUV, Sedan).
     * @throws Will throw an error if validation fails.
     */
    static validateManufacturerInput(input) {
      const { name, carModelName, carType } = input;
  
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        throw new Error('Manufacturer name is required and must be a non-empty string.');
      }
  
      if (!carModelName || typeof carModelName !== 'string' || carModelName.trim().length === 0) {
        throw new Error('Car model name is required and must be a non-empty string.');
      }
  
      const validCarTypes = ['SUV', 'Sedan', 'Hatchback', 'Truck', 'Convertible'];
      if (!carType || !validCarTypes.includes(carType)) {
        throw new Error(`Car type is required and must be one of the following: ${validCarTypes.join(', ')}`);
      }
    }
  
    /**
     * Formats the manufacturer data, ensuring proper casing and trimming whitespace.
     * This can be useful for consistent data formatting.
     * @param {Object} input - The manufacturer input data.
     * @returns {Object} - The formatted manufacturer data.
     */
    static formatManufacturerData(input) {
      return {
        name: ManufacturerHelper.capitalizeWords(input.name.trim()),
        carModelName: ManufacturerHelper.capitalizeWords(input.carModelName.trim()),
        carType: input.carType.trim(),
      };
    }
  
    /**
     * Capitalizes the first letter of each word in a string.
     * @param {string} str - The input string.
     * @returns {string} - The string with each word capitalized.
     */
    static capitalizeWords(str) {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }
  
    /**
     * Sanitizes input to prevent common SQL injection patterns or dangerous characters.
     * @param {string} value - The input string to sanitize.
     * @returns {string} - The sanitized string.
     */
    static sanitizeInput(value) {
      return value.replace(/[<>`"'\\/]/g, '');
    }
  
    /**
     * Generates a formatted error response for client-facing errors.
     * @param {Error} error - The error object to format.
     * @returns {Object} - A formatted error object.
     */
    static formatErrorResponse(error) {
      return {
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
      };
    }
  }
  
  module.exports = ManufacturerHelper;
  