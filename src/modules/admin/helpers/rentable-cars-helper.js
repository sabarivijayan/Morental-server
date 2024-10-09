import RentableRepository from "../repositories/rentable-cars-repositories.js";

class RentableCarsHelper{
    static async getAllRentableCars(){
        try {
            const rentableCar = await RentableRepository.findAllRentable();
            return rentableCar;
        } catch (error) {
            throw new Error('Error in the helper cannot fetch cars:' +error.message);
        }
    }

    static async addRentableCar(data){
        try {
            const { carId, pricePerDay, availableQuantity } = data;

            if( !carId || !pricePerDay || !availableQuantity){
                throw new Error(' Fill in all required fields: ');
            }

            const rentableCar = await RentableRepository.createRentableCars(data);
            return rentableCar;
        } catch (error) {
            throw new Error(error.message || 'Failed to add rentable car');
        }
    }
}

export default RentableCarsHelper;