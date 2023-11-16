const router = require('express').Router();
const categoryRoutes = require('./categoryRoutes');
const productRoutes= require('./productRoutes');
const tagRoutes = require('./tagRoutes');
const productTagRoutes = require('./productTagRoutes');

router.use('/category', categoryRoutes);
router.use('/product', productRoutes);
router.use('/tag', tagRoutes);
router.use('/productTag', productTagRoutes);;





module.exports = router;