import authResolver from "./resolvers/auth-resolvers.js";
import authTypeDefs from "./typeDefs/auth-type-defs.js";

import manufacturerResolver from "./resolvers/manufacturer-resolver.js";
import manufactureTypeDefs from "./typeDefs/manufacturer-type-defs.js";

import carResolvers from "./resolvers/car-resolver.js";
import CarTypeDefs from "./typeDefs/car-type-defs.js";

const adminTypeDefs = [authTypeDefs, manufactureTypeDefs, CarTypeDefs]; // Combine typeDefs
const adminResolvers = [authResolver, manufacturerResolver, carResolvers]; // Combine resolvers

export { adminTypeDefs, adminResolvers };