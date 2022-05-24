const OrientDB = require('orientjs');
const md5 = require("blueimp-md5");
const OrientDBClient = require("orientjs").OrientDBClient;
const {
   ridToString
} = require('./dbUtils');

let places = [
   {
      address_line1: "9108 Blue Jug Landing",
      address_line2: "",
      city: "Burke",
      state: "VA",
      zip_code: "22015"
   },
   {
      address_line1: "332 Laskin Road",
      address_line2: "Apt 321",
      city: "Virginia Beach",
      state: "VA",
      zip_code: "23451"
   },
   {
      address_line1: "4141 N Henderson Road",
      address_line2: "Apt 1321",
      city: "Arlington",
      state: "VA",
      zip_code: "22203"
   },
   {
      address_line1: "311 24th Street",
      address_line2: "Apt 1",
      city: "Virginia Beach",
      state: "VA",
      zip_code: "23451"
   },
   {
      address_line1: "1600 Pennsylvania Avenue NW",
      address_line2: "",
      city: "Washington, DC",
      state: "Washington, DC",
      zip_code: "20500"
   },
   {
      address_line1: "1 Avenue of the Arts",
      address_line2: "",
      city: "Newport News",
      state: "VA",
      zip_code: "23606"
   },
   {
      address_line1: "5115 Hampton Blvd",
      address_line2: "",
      city: "Norfolk",
      state: "VA",
      zip_code: "23529"
   },
   {
      address_line1: "4400 University Dr",
      address_line2: "",
      city: "Fairfax",
      state: "VA",
      zip_code: "22030"
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

let personalData = [
   {
      category: "Work From Home",
      answer: "No"
   },
   {
      category: "Work From Home",
      answer: "Yes"
   },
   {
      category: "Work From Home",
      answer: "Yes"
   },
   {
      category: "Personality",
      answer: "Introvert"
   },
   {
      category: "Personality",
      answer: "Extrovert"
   },
   {
      category: "Personality",
      answer: "Introvert"
   },
   {
      category: "Drinking",
      answer: "Yes"
   },
   {
      category: "Drinking",
      answer: "Sometimes"
   },
   {
      category: "Drinking",
      answer: "No"
   },
   {
      category: "Movies",
      answer: "No"
   },
   {
      category: "Movies",
      answer: "Yes"
   },
   {
      category: "Movies",
      answer: "Yes"
   },
];

let specs = [
   {
      sqrft: "700",
      bedrooms: "2",
      bathrooms: "1.5"
   },
   {
      sqrft: "2700",
      bedrooms: "4",
      bathrooms: "5.5"
   },
   {
      sqrft: "1200",
      bedrooms: "3",
      bathrooms: "3"
   },
   {
      sqrft: "1500",
      bedrooms: "4",
      bathrooms: "3.5"
   },
   {
      sqrft: "4000",
      bedrooms: "5",
      bathrooms: "5"
   },
   {
      sqrft: "5000",
      bedrooms: "6",
      bathrooms: "5.5"
   },
   {
      sqrft: "4500",
      bedrooms: "4",
      bathrooms: "4.5"
   },
   {
      sqrft: "900",
      bedrooms: "2",
      bathrooms: "2"
   }
];

openDbConnection = async () => {
   let client = await OrientDBClient.connect({
     host: "localhost",
     port: 2424
   });

   let pool = await client.sessions({
     name: "Sublet",
     username: "root",
     password: "root",
     pool: { max: 10 }
   });

   let db = await pool.acquire();
   return db;
}

deleteNodesFromClass = async (db) => {
   try {
      let result = await db.command("DELETE VERTEX FROM User").all();
      console.log(result);
      result = await db.command("DELETE VERTEX FROM Place").all();
      console.log(result);
      result = await db.command("DELETE VERTEX FROM Amenity").all();
      console.log(result);
      result = await db.command("DELETE VERTEX FROM PersonalData").all();
      console.log(result);
   } catch (err) {
      console.log(err)
   }
}

initializeDb = async () => {
   let client = await OrientDBClient.connect({
     host: "localhost",
     port: 2424
   });

   let pool = await client.sessions({
     name: "Sublet",
     username: "root",
     password: "root",
     pool: { max: 10 }
   });

   let db = await pool.acquire();

   await deleteNodesFromClass(db);

   try {
      let userRids = [];
      // Create Users
      for (let i = 0; i < users.length; i++) {
         let command = `
            CREATE VERTEX User SET
               first_name=:first_name,
               last_name=:last_name,
               password_hash=:password,
               phone=:phone,
               email=:email
         `;
         let result = await db.command(command, 
         {
            params: {
               first_name: users[i].first_name.toUpperCase(),
               last_name: users[i].last_name.toUpperCase(),
               password: md5(users[i].password),
               phone: users[i].phone.toUpperCase(),
               email: users[i].email.toUpperCase()
         }}).all();

         userRids.push(ridToString(result[0]['@rid']));
      }

      let placeRids = [];
      // Create Place nodes and edges from users
      for (let i = 0; i < places.length; i++) {
         let nodeCommand = `
            CREATE VERTEX Place SET
               address_line1=:address_line1,
               address_line2=:address_line2,
               city=:city,
               state=:state,
               zip_code=:zip_code
         `;
         let nodeResult = await db.command(nodeCommand, 
         {
            params: {
               address_line1: places[i].address_line1.toUpperCase(),
               address_line2: places[i].address_line2.toUpperCase(),
               city: places[i].city.toUpperCase(),
               state: places[i].state.toUpperCase(),
               zip_code: places[i].zip_code.toUpperCase()
         }}).all();

         let edgeResult = await db.command('CREATE EDGE isSubletting FROM '+userRids[i%3]+' TO '+ridToString(nodeResult[0]['@rid'])).all();

         placeRids.push(ridToString(nodeResult[0]['@rid']));
      }

      let amenityRids = [];
      // Create Amenity nodes and edges from places
      for (let i = 0; i < amenities.length; i++) {
         let nodeCommand = `
            CREATE VERTEX Amenity SET
               type=:type,
               name=:name
         `;
         let nodeResult = await db.command(nodeCommand, 
         {
            params: {
               type: amenities[i].type.toUpperCase(),
               name: amenities[i].name.toUpperCase()
         }}).all();

         let edgeResult = await db.command('CREATE EDGE has FROM '+placeRids[i%8]+' TO '+ridToString(nodeResult[0]['@rid'])).all();

         amenityRids.push(ridToString(nodeResult[0]['@rid']));
      }

      let specRids = [];
      // Create Spec nodes and edges from places
      for (let i = 0; i < specs.length; i++) {
         let nodeCommand = `
            CREATE VERTEX Spec SET
               sqrft=:sqrft,
               bedrooms=:bedrooms,
               bathrooms=:bathrooms
         `;
         let nodeResult = await db.command(nodeCommand, 
         {
            params: {
               sqrft: Number(specs[i].sqrft),
               bedrooms: Number(specs[i].bedrooms),
               bathrooms: Number(specs[i].bathrooms)
         }}).all();

         let edgeResult = await db.command('CREATE EDGE has FROM '+placeRids[i]+' TO '+ridToString(nodeResult[0]['@rid'])).all();

         specRids.push(ridToString(nodeResult[0]['@rid']));
      }

      let personalRids = [];
      // Create Spec nodes and edges from places
      for (let i = 0; i < personalData.length; i++) {
         let personalQuery = `
            SELECT @rid as rid FROM PersonalData
               WHERE 
                  category = :category AND
                  answer = :answer
         `;

         let queryResult = [];
         queryResult = await db.query(personalQuery,
         {
            params: {
               category: personalData[i].category.toUpperCase(),
               answer: personalData[i].answer.toUpperCase()
            }
         }).all();

         let personalRid = '';

         if (queryResult.length == 0) {
            let nodeCommand = `
               CREATE VERTEX PersonalData SET
                  category=:category,
                  answer=:answer
            `;
            let nodeResult = await db.command(nodeCommand, 
            {
               params: {
                  category: personalData[i].category.toUpperCase(),
                  answer: personalData[i].answer.toUpperCase()
            }}).all();
            personalRid = ridToString(nodeResult[0]['@rid']);
            personalRids.push(personalRid);
         }
         else {
            personalRid = ridToString(queryResult[0].rid);
         }

         let edgeResult = await db.command('CREATE EDGE has FROM '+userRids[i%3]+' TO '+personalRid).all();
      }

      if (userRids.length == 3) {
         console.log('User nodes successfully created.');
      }
      else {
         console.log(userRids.length + ' of 3 User nodes created.');
      }
      if (placeRids.length == 8) {
         console.log('Place nodes successfully created.');
      }
      else {
         console.log(placeRids.length + ' of 8 Place nodes created.');
      }
      if (amenityRids.length == 16) {
         console.log('Amenity nodes successfully created.');
      }
      else {
         console.log(amenityRids.length + ' of 16 Amenity nodes created.');
      }
      if (specRids.length == 8) {
         console.log('Spec nodes successfully created.');
      }
      else {
         console.log(specRids.length + ' of 8 Spec nodes created.');
      }
      if (personalRids.length == 9) {
         console.log('PersonalData nodes successfully created.');
      }
      else {
         console.log(personalRids.length + ' of 9 PersonalData nodes created.');
      }


   } catch (err) {
      console.log(err);
   }

   db.close();
   pool.close();
   client.close();
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
