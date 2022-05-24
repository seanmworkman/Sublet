const OrientDB = require('orientjs');
const md5 = require("blueimp-md5");


let places = [
   {
      address_line1: "9108 Blue Jug Landing",
      address_line2: "",
      city: "Burke",
      state: "VA",
      zip_code: "22015",
      bedrooms: "4",
      bathrooms: "5.5"
   },
   {
      address_line1: "332 Laskin Road",
      address_line2: "Apt 321",
      city: "Virginia Beach",
      state: "VA",
      zip_code: "23451",
      bedrooms: "2",
      bathrooms: "2"
   },
   {
      address_line1: "4141 N Henderson Road",
      address_line2: "Apt 1321",
      city: "Arlington",
      state: "VA",
      zip_code: "22203",
      bedrooms: "1",
      bathrooms: "1"
   },
   {
      address_line1: "311 24th Street",
      address_line2: "Apt 1",
      city: "Virginia Beach",
      state: "VA",
      zip_code: "23451",
      bedrooms: "3",
      bathrooms: "2"
   }
];

let users = [
   {
      phone: "7036384737",
      password: "SeanWorkmanPass",
      last_name: "Workman",
      first_name: "Sean",
      email: "sean.workman.96@gmail.com"
   },
   {
      first_name: "John",
      last_name: "Doe",
      password: "JohnDoePass",
      phone: "7031234567",
      email: "john.doe@gmail.com"
   },
   {
      first_name: "Jane",
      last_name: "Doe",
      password: "JaneDoePass",
      phone: "7031234589",
      email: "jane.doe@gmail.com"
   }
];

let amenities = [
   {
      type: "Outdoor",
      name: "Pool"
   },
   {
      type: "Outdoor",
      name: "Fire pit"
   },
   {
      type: "Outdoor",
      name: "Grill"
   },
   {
      type: "Outdoor",
      name: "Courtyard"
   },
   {
      type: "Indoor",
      name: "TV"
   },
   {
      type: "Indoor",
      name: "WIFI"
   },
   {
      type: "Indoor",
      name: "Elevator"
   },
   {
      type: "Indoor",
      name: "Fireplace"
   },
   {
      type: "Essentials",
      name: "Kitchen"
   },
   {
      type: "Essentials",
      name: "Air conditioning"
   },
   {
      type: "Essentials",
      name: "Garage Parking"
   },
   {
      type: "Essentials",
      name: "Heating"
   },
   {
      type: "Essentials",
      name: "Dishwasher"
   },
   {
      type: "Essentials",
      name: "Oven"
   },
   {
      type: "Essentials",
      name: "Stove"
   },
   {
      type: "Essentials",
      name: "Microwave"
   }
];



openDbServer = async () => {
   let server = await OrientDB({
      host:     'localhost',
      port:     2424,
      username: 'root',
      password: 'qS',
      useToken: true
   });
   console.log('Connecting to server...');
   return server;
}

deleteNodesFromClass = async (db, className) => {
   let deletedNode = await db.delete('VERTEX', className);
   console.log('Deleted Nodes: ' + deletedNode);
}

initializeDb = async () => {
   let server = await OrientDB({
      host:     'localhost',
      port:     2424,
      username: 'root',
      password: 'qS',
      useToken: true
   });
   console.log('Connecting to server...');
   let db = await server.use({
      name: 'Sublet',
      username: 'root',
      password: 'root'
   });
   console.log('Using Database:'  + db.name);

   // db.record.delete('#1:1');

   let users = await db.select().from('User').all();
   console.log(users)

   // let deletedNode = await db.delete('VERTEX', 'User');
   // console.log('Deleted Nodes: ' + deletedNode);

   // await deleteNodesFromClass(db, 'User');
   // await deleteNodesFromClass(db, 'Amenity');
   // await deleteNodesFromClass(db, 'Place');

   // for (let i = 0; i < users.length; i++) {
   //    let newUser = await db.create('VERTEX', 'User')
   //       .set({
   //          first_name: users[i].first_name,
   //          last_name: users[i].last_name,
   //          password_hash: md5(users[i].password),
   //          phone: users[i].phone,
   //          email: users[i].email
   //       }).one();
   //    console.log('New User Created: ' + newUser);
   // }



   await db.close();
   closeServer(server);
}

closeServer = async (server) => {
   await server.close();
   console.log('Server Closed.')
}


initializeDb();



// const initialize = async () => {
//     let client, pool = await createConnectionPool();
//     let session = await pool.acquire();

//     await session.close();
//     closeConnectionPool(client, pool);
// }

// initialize();
