// Imported loaders 
import { 
    users,
    getAllUsers,
    getAllPlacesWithSpecs
  } from './loaders.js';
  
  // All resolvers used for queries/mutations 
  export const resolvers = {
    
    Query: {
      users,
      getAllUsers,
      getAllPlacesWithSpecs
    }
    
  };
  