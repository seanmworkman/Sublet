// Imported loaders 
const { 
    users
  } = require('./loaders');
  
  // All resolvers used for queries/mutations 
  const resolvers = {
    
    Query: {
      users
    }
    
  };
  
  module.exports.resolvers = resolvers;