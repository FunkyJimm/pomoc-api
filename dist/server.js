"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const eatery_routes_1 = __importDefault(require("./src/routes/eatery-routes"));
const help_center_routes_1 = __importDefault(require("./src/routes/help-center-routes"));
const information_routes_1 = __importDefault(require("./src/routes/information-routes"));
const login_routes_1 = __importDefault(require("./src/routes/login-routes"));
const shelters_routes_1 = __importDefault(require("./src/routes/shelters-routes"));
const users_1 = __importDefault(require("./src/routes/users"));
const db_connect_1 = __importDefault(require("./src/db/db-connect"));
const session_handlers_1 = require("./src/helpers/session-handlers");
const app = (0, express_1.default)();
(0, db_connect_1.default)();
const sessionParser = (0, express_session_1.default)({
    secret: '123',
    resave: false,
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(sessionParser);
app.use('/', eatery_routes_1.default);
app.use('/', help_center_routes_1.default);
app.use('/', information_routes_1.default);
app.use('/', login_routes_1.default);
app.use('/', shelters_routes_1.default);
app.use('/', [session_handlers_1.sessionCheck, users_1.default]);
app.get('/', (req, res) => {
    res.send('Pomoc dla bezdomnych api by FunkyJimm. All rights reserved.');
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
