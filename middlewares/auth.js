const User = require('../models/User');

const auth = function(req, res, next) {
    res.locals.currentUser = null;
    res.locals.verify = null;
    res.locals.userType = null;
    const { userId } = req.session;
    if (!userId) {
        next();
    } else {
        User.findOne({
            where: {
                id: userId,
            }
        }).then(function(user) {
            if (!user) {
                delete req.session.userId;
                next();
            } else {
                req.verify = user.Verify;
                res.locals.verify = user.Verify;
                req.userType = user.UserType;
                res.locals.userType = user.UserType;
                req.currentUser = user;
                res.locals.currentUser = user;
                next();
            }
        }).catch(next);
    }
}

module.exports = auth;