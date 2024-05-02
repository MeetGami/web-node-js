// // Import necessary modules
// const express = require('express');
// const bodyParser = require('body-parser');

// // Create an Express application
// const app = express();

// // Set up middleware to parse request bodies
// app.use(bodyParser.urlencoded({ extended: true }));

// // Define a route to serve the HTML form
// app.get('/', (req, res) => {
//   res.send(`
//     <html>
//       <head>
//         <title>User Form</title>
//       </head>
//       <body>
//         <h1>User Form</h1>
//         <form action="/submit" method="post">
//           <label for="name">Name:</label><br>
//           <input type="text" id="name" name="name"><br>
//           <label for="email">Email:</label><br>
//           <input type="email" id="email" name="email"><br><br>
//           <button type="submit">Submit</button>
//         </form>
//       </body>
//     </html>
//   `);
// });

// // Define a route to handle form submission
// app.post('/submit', (req, res) => {
//   // Extract data from the request body
//   const name = req.body.name;
//   const email = req.body.email;

//   // Log the data to the console
//   console.log('Name:', name);
//   console.log('Email:', email);

//   // Respond to the client
//   res.send('Data received and logged to the console!');
// });

// // Start the server
// const port = 4000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express1 = require('./multifunc.js');
console.log(express1.meet2())