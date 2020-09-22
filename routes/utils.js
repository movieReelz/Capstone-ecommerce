function requireCustomer(req, res, next) {
    if (!req.customer) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }
    next();
}
function isAdminCheck(req, res, next) {
    if (!req.customer.isAdmin) {
        next({
            name: "you are not an admin",
            mesage: "get out"
        })
    }
    next()
}
module.exports = {
    requireCustomer
}