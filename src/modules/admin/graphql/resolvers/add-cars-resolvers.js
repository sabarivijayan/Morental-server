import CarHelper from "../../helpers/car-helper";


const CarResolver ={
    Query: {
        getCars: async () => {
            return await CarHelper.getCars();
        }
    },
    Mutation:{
        addCar: async(_,{name, manufacturerId}) =>{
            return await CarHelper.addCar(name, manufacturerId);
        }
    },
};

export default CarResolver;