const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); //morgan: logger middleware
const colors = require('colors');

const db = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
db();

//require routes
//const tests = require('./routes/tests');

//Initialize express
const app = express();

//body parser middleware
app.use(express.json());

/*Dev logging middleware
To be used only in development mode*/
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

//Mount routers
//app.use('/oporctunite-api/v1/tests', tests);


//Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

/*Handle unhandled promise rejection
This is typically in case we cannot 
connect to Mysql whathever the reason*/
process.on('unhandledRejection', (err, promise) => {
    console.log(`error: ${err.message}`.red);
    //close server & exit process
    server.close(() => process.exit(1));
});
