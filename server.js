const express = require('express');
const allRoutes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {Category,Tag, Product, ProductTag} = require('./models/');

app.use('/',allRoutes);

app.use(allRoutes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });