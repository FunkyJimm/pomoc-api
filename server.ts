import express from 'express';

import eateriesRoutes from './src/routes/eatery-route';
import helpCentersRoutes from './src/routes/help-center-route';
import informationsRoutes from './src/routes/information-route';
import sheltersRoutes from './src/routes/shelters';
import usersRoutes from './src/routes/users';
import dbConnect from './src/db/db-connect';

const app = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', eateriesRoutes);
app.use('/', helpCentersRoutes);
app.use('/', informationsRoutes);
app.use('/', sheltersRoutes);
app.use('/', usersRoutes);

app.get('/', (req, res) => {
  res.send('Pomoc dla bezdomnych api by FunkyJimm. All rights reserved.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));