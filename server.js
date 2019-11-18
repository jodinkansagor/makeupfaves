//load environment variables

require('dotenv').config();

// what are our dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//database client
const client = require('./lib/client');

//services
const makeupsAPI = require('./lib/makeupApiCall');

//Auth
const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes.js');
const authRoutes = createAuthRoutes({
    async selectUser(email) {
        const result = await client.query(`
            SELECT id, email, hash, display_name as "displayName"
            FROM users
            Where email = $1;
        `, [email]);
        return result.rows[0];
    },
});

//applicaton setup
const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev')); //http logging
app.use(cors());
app.use(express.static('public')); // server files from public folder
app.use(express.json()); // enable reading incoming json

//setup authentication routes
app.use('/api/auth', authRoutes);

//all the routes that start with /api need a token
app.use('/api', ensureAuth);

//**API ROUTES ***

app.get('/api/makeups', async (req, res) => {

    try {
        const query = req.query;

        //get data from the third party api
        const makeups = await makeupsAPI.get(query.search, query.page);

        //so much more needs to happen in here with the faves. come back to this.

        res.json(makeups)
    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }

});

// add in the post, put and delete requests

//start server
app.listen(PORT, () => {
    console.log('server runnong on PORT', PORT)
});