import express from 'express';
import session from 'express-session';

import eateriesRoutes from './src/routes/eatery-routes';
import helpCentersRoutes from './src/routes/help-center-routes';
import informationsRoutes from './src/routes/information-routes';
import loginRoutes from './src/routes/login-routes';
import sheltersRoutes from './src/routes/shelters-routes';
import usersRoutes from './src/routes/users';

import dbConnect from './src/db/db-connect';
import { sessionCheck } from './src/helpers/session-handlers';

const app = express();

dbConnect();

const sessionParser = session({
  secret: '123',
  resave: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sessionParser);

app.use('/', eateriesRoutes);
app.use('/', helpCentersRoutes);
app.use('/', informationsRoutes);
app.use('/', loginRoutes);
app.use('/', sheltersRoutes);
app.use('/', [sessionCheck, usersRoutes]);

app.get('/', (req, res) => {
  res.send('Pomoc dla bezdomnych api by FunkyJimm. All rights reserved.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));