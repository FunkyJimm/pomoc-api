"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionCheck = void 0;
const sessionCheck = (req, res, next) => {
    if (req.session.loggedin) {
        next();
    }
    else {
        res.status(401).send({
            code: 404,
            message: 'You do not have permission to get this resources.',
        });
    }
};
exports.sessionCheck = sessionCheck;
