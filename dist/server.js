"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eatery_route_1 = __importDefault(require("./src/routes/eatery-route"));
const informations_1 = __importDefault(require("./src/routes/informations"));
const shelters_1 = __importDefault(require("./src/routes/shelters"));
const users_1 = __importDefault(require("./src/routes/users"));
const db_connect_1 = __importDefault(require("./src/db/db-connect"));
const app = (0, express_1.default)();
(0, db_connect_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', eatery_route_1.default);
app.use('/', informations_1.default);
app.use('/', shelters_1.default);
app.use('/', users_1.default);
app.get('/', (req, res) => {
    res.send('Pomoc dla bezdomnych api by FunkyJimm. All rights reserved.');
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
