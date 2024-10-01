import manufacturerTypeDefs from './typeDefs/manufacturer-type-defs.js';
import { manufacturerResolvers } from './resolvers/manufacturer-resolver.js';

const adminTypeDefs = [manufacturerTypeDefs]; // Combine typeDefs
const adminResolvers = [manufacturerResolvers]; // Combine resolvers

export { adminTypeDefs, adminResolvers };