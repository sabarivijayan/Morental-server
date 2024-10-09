import Car from "../models/car-model";
import { carValidator } from "../../../utils/car-validation";

class CarHelper{
    
    async getCars(){
        return await Car.findAll();
    }

    async getCar(id){
        return await Car.findByPk(id);
    }

    async addCar(input){
        const validateError = carValidator(input);
        if(validateError.length){
            throw new Error(validateError.join(', '));
        }
        const car = await Car.create({
            name: input.name,
            description: input.description,
            price: input.price,
            primaryImage: input.primaryImage,
            secondaryImages: input.secondaryImages,
            quantity: input.quantity,
            manufacturerId: input.manufacturerId,
        });
        return car;
    }

    async editCar(id, input){
        const validateError = carValidator(input);
        if(validateError.length){
            throw new Error(validateError.join(', '));
        }
        const car = await Car.findByPk(id);
        if(!car){
            throw new Error('Car cannot be found');
        }
        return await car.update(input);
    }

    async deleteCar(id){
        try {
            const car = await Car.findByPk(id);
            if(!car){
                throw new Error('Car cannot be found');
            }
            await car.destroy();
            return true;
        } catch (error) {
            console.error(`Error deleting the car: ${error.message}`);
            throw error;
        }
    }
}

export default new CarHelper();