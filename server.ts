import express from 'express';
import informationsRoutes from './src/routes/informations';
import sheltersRoutes from './src/routes/shelters';
import usersRoutes from './src/routes/users';
import dbConnect from './src/db/db-connect';

const app = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', informationsRoutes);
app.use('/', sheltersRoutes);
app.use('/', usersRoutes);

app.get('/', (req, res) => {
  res.send('Pomoc dla bezdomnych api by FunkyJimm. All rights reserved.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));