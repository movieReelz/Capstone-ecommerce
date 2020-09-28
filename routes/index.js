const express = require('express');
const apiRouter = express.Router()
const customersRouter = require('./customer');
const moviesRouter = require('./movieRoute');
const cartRouter = require('./cartRoute');
const genreRouter = require('./genres');
// // authorization
// set `req.user` if possible
const jwt = require('jsonwebtoken');
const { getCustomerById } = require('../db');
const { JWT_SECRET } = process.env;

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) { // nothing to see here
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            console.log("is this the auth", auth)
            console.log("this is the token", token)
            const { id } = jwt.verify(token, JWT_SECRET);
            console.log("this is the id......", id)
            if (id) {
                req.customer = await getCustomerById(id.id);
                console.log("is this the rq.customer..", req.customer)
                next();
            }

        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`
        });
    }
});
apiRouter.use((req, res, next) => {
    if (req.customer) {
        console.log("User is set:", req.customer);
    }

    next();
});

apiRouter.use('/customer', customersRouter);
apiRouter.use('/movies', moviesRouter);
apiRouter.use('/cart', cartRouter);
apiRouter.use('/genres', genreRouter);
apiRouter.use((error, req, res, next) => {
    res.status(500).send(error);
})
module.exports = apiRouter;
