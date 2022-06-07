// Imported loaders 
import { 
    users,
    getAllUsers,
    getAllPlacesWithSpecs,
    getPlaceSearchResult
  } from './loaders.js';
  
  // All resolvers used for queries/mutations 
  export const resolvers = {
    
    Query: {
      users,
      getAllUsers,
      getAllPlacesWithSpecs,
      getPlaceSearchResult
    }
    
  };
  