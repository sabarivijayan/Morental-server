import authResolver from "./resolvers/auth-resolvers";
import authTypeDefs from "./typeDefs/auth-type-defs";

import manufacturerResolver from "./resolvers/manufacturer-resolver";
import manufactureTypeDefs from "./typeDefs/manufacturer-type-defs";

import carResolvers from "./resolvers/car-resolver";
import CarTypeDefs from "./typeDefs/car-type-defs";

const adminTypeDefs = [authTypeDefs, manufactureTypeDefs, CarTypeDefs]; // Combine typeDefs
const adminResolvers = [authResolver, manufacturerResolver, carResolvers]; // Combine resolvers

export { adminTypeDefs, adminResolvers };