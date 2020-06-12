const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); //morgan: logger middleware
const colors = require('colors');
const { momentFr } = require('./helper/momentFr');

//moment locale fr formatting helper
momentFr();

//load env vars
dotenv.config({ path: './config/config.env' });

const DB = require('./config/db');

//Connect to database
DB
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//require routes
const tests = require('./routes/tests');
const bilans = require('./routes/bilans');
const eleveurs = require('./routes/eleveurs');

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
app.use('/oporctunite-api/v1/tests', tests);
app.use('/oporctunite-api/v1/bilans', bilans);
app.use('/oporctunite-api/v1/eleveurs', eleveurs);


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
//killall -9 node kills all node process just in case...
process.on('SIGTERM', (err, promise) => {
    console.log(`error: ${err.message}`.red);
    server.close(() => process.exit(1));
});