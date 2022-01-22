"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const eatery_routes_1 = __importDefault(require("./src/routes/eatery-routes"));
const help_center_routes_1 = __importDefault(require("./src/routes/help-center-routes"));
const information_routes_1 = __importDefault(require("./src/routes/information-routes"));
const login_routes_1 = __importDefault(require("./src/routes/login-routes"));
const shelter_routes_1 = __importDefault(require("./src/routes/shelter-routes"));
const user_routes_1 = __importDefault(require("./src/routes/user-routes"));
const db_connect_1 = __importDefault(require("./src/db/db-connect"));
const app = (0, express_1.default)();
(0, db_connect_1.default)();
const sessionParser = (0, express_session_1.default)({
    secret: '123',
    resave: false,
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use(sessionParser);
app.use('/', eatery_routes_1.default);
app.use('/', help_center_routes_1.default);
app.use('/', information_routes_1.default);
app.use('/', login_routes_1.default);
app.use('/', shelter_routes_1.default);
app.use('/', user_routes_1.default);
app.get('/', (req, res) => {
    res.send('Pomoc dla bezdomnych api by FunkyJimm. All rights reserved.');
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
