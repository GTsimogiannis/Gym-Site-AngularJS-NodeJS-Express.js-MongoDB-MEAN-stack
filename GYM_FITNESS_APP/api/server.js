const dotenv = require("dotenv");

dotenv.config({ path : './config.env'});

const app = require('./app');


const port = process.env.PORT;


//START SERVER
app.listen(port, () => {
    console.log('Server Listens....');
});