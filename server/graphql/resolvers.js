// Imported loaders 
const { 
    users,
    getAllUsers
  } = require('./loaders');
  
  // All resolvers used for queries/mutations 
  const resolvers = {
    
    Query: {
      users,
      getAllUsers
    }
    
  };
  
  module.exports.resolvers = resolvers;